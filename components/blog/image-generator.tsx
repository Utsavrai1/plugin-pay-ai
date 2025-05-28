"use client";

import { useState } from "react";
import { Loader2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ImageGeneratorProps {
  blogData: any;
  setBlogData: (data: any) => void;
}

export function ImageGenerator({ blogData, setBlogData }: ImageGeneratorProps) {
  const [imagePrompt, setImagePrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateImage = async () => {
    const textToUse = imagePrompt || blogData.selectedTitle || blogData.content;

    if (!textToUse) {
      toast({
        title: "Error",
        description: "Please provide text for image generation",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://aaas-labs-clarifai-node-backend.onrender.com/api/createBlog/generate-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: textToUse }),
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setBlogData({
          ...blogData,
          imageUrl,
        });
        toast({
          title: "Success",
          description: "Image generated successfully!",
        });
      } else {
        throw new Error("Failed to generate image");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="imagePrompt">Image Description (Optional)</Label>
        <Textarea
          id="imagePrompt"
          placeholder="Describe the image you want to generate, or leave blank to use the blog title..."
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <Button onClick={generateImage} disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <ImageIcon className="mr-2 h-4 w-4" />
            Generate Image
          </>
        )}
      </Button>

      {blogData.imageUrl && (
        <div className="space-y-2">
          <Label>Generated Image:</Label>
          <div className="border rounded-lg overflow-hidden">
            <img
              src={blogData.imageUrl || "/placeholder.svg"}
              alt="Generated blog image"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
