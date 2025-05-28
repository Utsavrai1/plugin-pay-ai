import type { Metadata } from "next"
import { BlogCreator } from "@/components/blog/blog-creator"

export const metadata: Metadata = {
  title: "Blog Creator | Sales Team Productivity",
  description: "Create SEO-optimized blog content with AI assistance",
}

export default function BlogPage() {
  return <BlogCreator />
}
