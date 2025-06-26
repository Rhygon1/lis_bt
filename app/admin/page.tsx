"use client";

import Header from "../components/header";
import Footer from "../components/footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { upload } from "@vercel/blob/client";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Check, LoaderIcon, X } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { addProduct } from "../(data)/addProduct";
import { dataProductType } from "../(data)/getProducts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import webpfy from "webpfy";
import { useUser } from "../components/auth-context";

let collections = [
  "Readymade Suits",
  "Anarkalis",
  "Gowns",
  "Lehangas",
  "Menswear",
  "Girls Kids Dresses",
  "Boys Kids Dresses",
  "Jewellery",
  "Sarees",
  "Blouses",
  "Indo Western",
];

let collectionWithOther = [
  "Readymade Suits",
  "Anarkalis",
  "Gowns",
  "Lehangas",
  "Menswear",
  "Girls Kids Dresses",
  "Boys Kids Dresses",
  "Jewellery",
  "Sarees",
  "Blouses",
  "Indo Western",
  "Other",
];

type MediaFile = {
  id: string;
  file: File;
  preview: string;
};

export default function Main() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loadState, setLoadState] = useState("");

  const formSchema = z.object({
    id: z.string(),
    title: z.string().min(2),
    type: z.string().min(2),
    sizes: z.array(z.string()).min(1),
    dispatch: z.string().min(1),
    inStock: z.boolean(),
    media: z
      .array(
        z.custom<File>(
          (val) => typeof window !== "undefined" && val instanceof File,
          {
            message: "Each media item must be a File",
          }
        )
      )
      .min(1),
    description: z.string().min(2),
    price: z.coerce.number().min(1),
    customPrice: z.coerce.number().min(1),
    unstitchPrice: z.coerce.number().min(1),
  });

  const { user, customData } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: uuidv4(),
      title: "",
      type: "Other",
      sizes: [],
      dispatch: "",
      inStock: true,
      media: [],
      description: "",
      price: 0,
      customPrice: 0,
      unstitchPrice: 0,
    },
  });

  const price = useWatch({
    control: form.control,
    name: "price",
  });
  const sizes = useWatch({
    control: form.control,
    name: "sizes",
  });

  useEffect(() => {
    if (price > 1) {
      if (!sizes?.includes("Unstitched")) {
        form.setValue("unstitchPrice", price);
      }
      if (!sizes?.includes("Customized")) {
        form.setValue("customPrice", price);
      }
    }
  }, [price, sizes, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoadState("loading");
    values.id = uuidv4();
    let urls = await Promise.all(
      values.media.map(async (file) => {
        if (!file.type.startsWith("video/")) {
          const { webpBlob, fileName } = await webpfy({ image: file });
          const newBlob = await upload(fileName, webpBlob, {
            access: "public",
            handleUploadUrl: "/api/createToken",
          });
          return newBlob.url;
        } else {
          const newBlob = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/createToken",
          });
          return newBlob.url;
        }
      })
    );

    let newProduct = {
      title: values.title,
      type: values.type,
      sizes: values.sizes,
      dispatch: values.dispatch,
      inStock: values.inStock,
      media: urls,
      description: values.description,
      price: values.price,
      customPrice: values.customPrice,
      unstitchPrice: values.unstitchPrice,
    } as Omit<Omit<dataProductType, "id">, "createdAt">;

    if (user != null) {
      let result = await addProduct(newProduct, user.id);
      if (result.success) {
        setLoadState("check");
      } else {
        console.log(result.error);
      }
    } else {
      console.error("Not logged in");
    }

    console.log(values);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const media = selectedFiles.map((file) => ({
      id: uuidv4(), // stable identity
      file,
      preview: URL.createObjectURL(file),
    }));
    setMediaFiles(media);
    form.setValue("media", selectedFiles);
  };

  function remove(id: string) {
    setMediaFiles((a) => a.filter((p) => p.id != id));
  }

  const reorder = (list: MediaFile[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result: any) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      mediaFiles,
      result.source.index,
      result.destination.index
    );

    setMediaFiles(items);
  }

  useEffect(() => {
    form.setValue(
      "media",
      mediaFiles.map((f) => f.file)
    );
  }, [mediaFiles]);

  if (!user){
    return <div>404 Unauthorized</div>
  }

  return (
    <>
      <Header collections={collections}></Header>
        {customData.admin == true && (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, (errors) => {
                  console.log("Validation Errors", errors);
                })}
                className="space-y-8 m-5"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Other" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Type</SelectLabel>
                              {collectionWithOther.map((c) => {
                                return (
                                  <SelectItem key={c} value={c}>
                                    {c}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sizes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sizes</FormLabel>
                      <FormControl>
                        <ToggleGroup
                          type="multiple"
                          className="flex flex-wrap gap-2"
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          {[
                            "Unstitched",
                            "Customized",
                            "XS",
                            "S",
                            "M",
                            "L",
                            "XL",
                            "XXL",
                            "3XL",
                            "4XL",
                            "5XL",
                            "6XL",
                            "7XL",
                            "8XL",
                            "0-6 months",
                            "6-12 months",
                            "1-2 years",
                            "2-3 years",
                            "3-4 years",
                            "4-5 years",
                            "5-6 years",
                            "6-7 years",
                            "7-8 years",
                            "8-9 years",
                            "9-10 years",
                            "10-11 years",
                            "11-12 years",
                            "12-13 years",
                            "13-14 years",
                            "14-15 years"
                          ].map((size) => (
                            <ToggleGroupItem
                              key={size}
                              value={size}
                              className="px-20 py-2 text-lg rounded-xl border w-fit data-[state=on]:bg-slate-800 data-[state=on]:text-white"
                            >
                              <p>{size}</p>
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dispatch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dispatch</FormLabel>
                      <FormControl>
                        <RadioGroup
                          className="flex flex-col gap-2 mt-3"
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          {[
                            "Ready to be shipped!",
                            "Will be shipped in 15-20 days.",
                          ].map((type) => (
                            <div className="flex gap-3" key={type}>
                              <RadioGroupItem
                                key={type}
                                value={type}
                                id={type}
                                className="px-2 py-2 text-lg rounded-xl border w-fit"
                              />
                              <Label htmlFor={type}>{type}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="inStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>In Stock</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="inStock-switch"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label htmlFor="inStock-switch">In stock</Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Normal Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customised Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unstitchPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unstitched Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Input
                  type="file"
                  name="file"
                  accept="image/*,video/*"
                  required
                  multiple
                  onChange={handleFileChange}
                ></Input>

                {mediaFiles.length > 0 && (
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable" direction="horizontal">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="flex max-h-[80vh] overflow-x-auto relative max-w-[95%]"
                        >
                          {mediaFiles.map((item, i) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={i}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="cursor-grab p-1 basis-[40%] shrink-0 py-5 border-2 border-black active:cursor-grabbing"
                                >
                                  {item.file.type.startsWith("video/") ? (
                                    <div className="relative w-fit">
                                      <video
                                        src={item.preview}
                                        controls
                                        className="w-fit rounded"
                                      />

                                      <button
                                        type="button"
                                        onClick={() => remove(item.id)}
                                        className="absolute top-3 right-3 rounded-full bg-white w-5 h-5 flex items-center justify-center"
                                      >
                                        <X className="w-4"></X>
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="relative w-fit">
                                      <img
                                        src={item.preview}
                                        alt="preview"
                                        className="w-fit rounded object-cover"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => remove(item.id)}
                                        className="absolute top-3 right-3 rounded-full bg-white w-5 h-5 flex items-center justify-center"
                                      >
                                        <X className="w-4"></X>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}

                {loadState != "" &&
                  (loadState == "loading" ? (
                    <LoaderIcon className="w-10 animate-spin"></LoaderIcon>
                  ) : (
                    <Check className="w-10"></Check>
                  ))}

                <Button type="submit">Submit</Button>
              </form>
            </Form>
            <Footer></Footer>
          </>
        )}
    </>
  );
}
