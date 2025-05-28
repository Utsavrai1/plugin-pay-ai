"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"

interface BlogPreviewProps {
  blogData: any
}

export function BlogPreview({ blogData }: BlogPreviewProps) {
  const downloadBlog = () => {
    const blogContent = {
      title: blogData.selectedTitle,
      metadata: blogData.metadata,
      content: blogData.content,
      keywords: blogData.keywords,
      imageUrl: blogData.imageUrl,
    }

    const dataStr = JSON.stringify(blogContent, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `blog-${Date.now()}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Blog Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {blogData.selectedTitle && (
          <div>
            <h3 className="font-semibold text-lg mb-2">{blogData.selectedTitle}</h3>
          </div>
        )}

        {blogData.imageUrl && (
          <div className="border rounded-lg overflow-hidden">
            <img
              src={blogData.imageUrl || "/placeholder.svg"}
              alt="Blog featured image"
              className="w-full h-32 object-cover"
            />
          </div>
        )}

        {blogData.metadata && (
          <div className="space-y-2">
            <Badge variant="secondary">Meta Description</Badge>
            <p className="text-sm text-muted-foreground">{blogData.metadata.meta_description?.substring(0, 100)}...</p>
          </div>
        )}

        {blogData.content && (
          <div className="space-y-2">
            <Badge variant="secondary">Content Preview</Badge>
            <p className="text-sm text-muted-foreground">{blogData.content.substring(0, 150)}...</p>
          </div>
        )}

        {blogData.keywords && (
          <div className="space-y-2">
            <Badge variant="secondary">Keywords</Badge>
            <p className="text-sm">{blogData.keywords}</p>
          </div>
        )}

        <div className="pt-4">
          <Button onClick={downloadBlog} disabled={!blogData.selectedTitle} className="w-full" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Blog Data
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
