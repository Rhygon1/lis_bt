"use client"

import { useState } from "react"
import { Copy, Share2 } from "lucide-react"
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  RedditIcon,
} from "next-share"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface ShareButtonProps {
  url: string
  title: string
  description?: string
}

export function ShareButton({ url, title, description = "Check this out!" }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(url)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-4 gap-2 bg-transparent">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>Share this content with your friends and colleagues</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 py-4">
          <Input value={url} readOnly className="flex-1" />
          <Button variant="outline" size="icon" onClick={handleCopyLink} title="Copy link">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-3 justify-center py-2">
          <FacebookShareButton url={url} quote={description}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <LinkedinShareButton url={url} title={title} summary={description}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>

          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <RedditShareButton url={url} title={title}>
            <RedditIcon size={40} round />
          </RedditShareButton>

        </div>
      </DialogContent>
    </Dialog>
  )
}
