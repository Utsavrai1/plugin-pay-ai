"use client";

import { useState } from "react";
import { Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ContentGeneratorProps {
  blogData: any;
  setBlogData: (data: any) => void;
}

export function ContentGenerator({
  blogData,
  setBlogData,
}: ContentGeneratorProps) {
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateContent = async () => {
    if (!blogData.selectedTitle || !blogData.keywords) {
      toast({
        title: "Error",
        description: "Please select a title and ensure keywords are set",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://aaas-labs-clarifai-node-backend.onrender.com/api/createBlog/generate-content",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: blogData.selectedTitle,
            keywords: blogData.keywords,
            Instructions: instructions,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        // Handle different response formats
        let content = "";

        if (typeof data.generated_content === "string") {
          // Direct string content
          content = data.generated_content;
        } else if (data.generated_content.content) {
          // Object with content field
          content = data.generated_content.content;
        } else if (data.generated_content.text) {
          // Object with text field
          content = data.generated_content.text;
        } else if (typeof data.generated_content === "object") {
          // Try to stringify the object
          try {
            content = JSON.stringify(data.generated_content, null, 2);
          } catch (e) {
            content = "Error parsing content";
          }
        } else {
          content = "Generated content in unknown format";
          console.warn("Unknown content format:", data.generated_content);
        }

        setBlogData({
          ...blogData,
          content,
        });

        toast({
          title: "Success",
          description: "Content generated successfully!",
        });
      } else {
        throw new Error(data.message || "Failed to generate content");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
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
          Please select a title first to generate content.
        </p>
      ) : (
        <>
          <div className="space-y-2">
            <Label>Selected Title:</Label>
            <p className="text-sm font-medium">{blogData.selectedTitle}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">
              Additional Instructions (Optional)
            </Label>
            <Textarea
              id="instructions"
              placeholder="Enter any specific instructions for content generation..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button
            onClick={generateContent}
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
                <FileText className="mr-2 h-4 w-4" />
                Generate Content
              </>
            )}
          </Button>

          {blogData.content && (
            <div className="space-y-2">
              <Label>Generated Content:</Label>
              <Textarea
                value={blogData.content}
                onChange={(e) =>
                  setBlogData({ ...blogData, content: e.target.value })
                }
                className="min-h-[300px]"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
