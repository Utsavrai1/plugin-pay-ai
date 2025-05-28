"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TitleGenerator } from "@/components/blog/title-generator"
import { MetadataGenerator } from "@/components/blog/metadata-generator"
import { ContentGenerator } from "@/components/blog/content-generator"
import { ImageGenerator } from "@/components/blog/image-generator"
import { BlogPreview } from "@/components/blog/blog-preview"

export function BlogCreator() {
  const [blogData, setBlogData] = useState({
    titles: [],
    selectedTitle: "",
    metadata: null,
    content: "",
    imageUrl: "",
    keywords: "",
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog Creator</h1>
        <p className="text-muted-foreground">Create SEO-optimized blog content with AI assistance.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="titles" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="titles">Titles</TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
            </TabsList>

            <TabsContent value="titles">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Blog Titles</CardTitle>
                  <CardDescription>Enter keywords to generate SEO-optimized blog titles</CardDescription>
                </CardHeader>
                <CardContent>
                  <TitleGenerator blogData={blogData} setBlogData={setBlogData} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metadata">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Metadata</CardTitle>
                  <CardDescription>Generate SEO metadata based on your selected title</CardDescription>
                </CardHeader>
                <CardContent>
                  <MetadataGenerator blogData={blogData} setBlogData={setBlogData} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Content</CardTitle>
                  <CardDescription>Create detailed blog content with AI assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContentGenerator blogData={blogData} setBlogData={setBlogData} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="image">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Featured Image</CardTitle>
                  <CardDescription>Create a custom image for your blog post</CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageGenerator blogData={blogData} setBlogData={setBlogData} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <BlogPreview blogData={blogData} />
        </div>
      </div>
    </div>
  )
}
