"use client";

import { useState } from "react";
import { Loader2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface MetadataGeneratorProps {
  blogData: any;
  setBlogData: (data: any) => void;
}

export function MetadataGenerator({
  blogData,
  setBlogData,
}: MetadataGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateMetadata = async () => {
    if (!blogData.selectedTitle) {
      toast({
        title: "Error",
        description: "Please select a title first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/createBlog/generate-metadata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: blogData.selectedTitle }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        // Handle different response formats
        let metadata = {};

        if (
          data.generated_content.meta_description ||
          data.generated_content.meta_keywords
        ) {
          // Standard format with meta fields
          metadata = data.generated_content;
        } else if (data.generated_content.text) {
          // Plain text format
          const textContent = data.generated_content.text;

          // Try to extract metadata from the text
          const metaDescription = textContent.match(
            /description:?\s*(.*?)(?=\n|$)/i
          );
          const metaKeywords = textContent.match(/keywords:?\s*(.*?)(?=\n|$)/i);
          const focusKeyword = textContent.match(
            /focus\s*keyword:?\s*(.*?)(?=\n|$)/i
          );

          metadata = {
            meta_description: metaDescription
              ? metaDescription[1].trim()
              : textContent.substring(0, 160),
            meta_keywords: metaKeywords
              ? metaKeywords[1].trim()
              : blogData.keywords,
            focus_keyword: focusKeyword
              ? focusKeyword[1].trim()
              : blogData.keywords.split(",")[0].trim(),
          };
        } else {
          // Unknown format - create basic metadata
          metadata = {
            meta_description: `Article about ${blogData.selectedTitle}`,
            meta_keywords: blogData.keywords,
            focus_keyword: blogData.keywords.split(",")[0].trim(),
          };
          console.warn("Unknown metadata format:", data.generated_content);
        }

        setBlogData({
          ...blogData,
          metadata,
        });

        toast({
          title: "Success",
          description: "Metadata generated successfully!",
        });
      } else {
        throw new Error(data.message || "Failed to generate metadata");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate metadata. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!blogData.selectedTitle ? (
        <p className="text-muted-foreground">
          Please select a title first to generate metadata.
        </p>
      ) : (
        <>
          <div className="space-y-2">
            <Label>Selected Title:</Label>
            <p className="text-sm font-medium">{blogData.selectedTitle}</p>
          </div>

          <Button
            onClick={generateMetadata}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Tag className="mr-2 h-4 w-4" />
                Generate Metadata
              </>
            )}
          </Button>

          {blogData.metadata && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Description:</Label>
                <Textarea
                  value={blogData.metadata.meta_description || ""}
                  onChange={(e) =>
                    setBlogData({
                      ...blogData,
                      metadata: {
                        ...blogData.metadata,
                        meta_description: e.target.value,
                      },
                    })
                  }
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Meta Keywords:</Label>
                <Textarea
                  value={blogData.metadata.meta_keywords || ""}
                  onChange={(e) =>
                    setBlogData({
                      ...blogData,
                      metadata: {
                        ...blogData.metadata,
                        meta_keywords: e.target.value,
                      },
                    })
                  }
                  className="min-h-[60px]"
                />
              </div>
              {blogData.metadata.focus_keyword && (
                <div className="space-y-2">
                  <Label>Focus Keyword:</Label>
                  <p className="text-sm font-medium">
                    {blogData.metadata.focus_keyword}
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
