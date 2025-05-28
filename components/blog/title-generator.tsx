"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface TitleGeneratorProps {
  blogData: any;
  setBlogData: (data: any) => void;
}

export function TitleGenerator({ blogData, setBlogData }: TitleGeneratorProps) {
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateTitles = async () => {
    if (!keywords.trim()) {
      toast({
        title: "Error",
        description: "Please enter keywords to generate titles",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://aaas-labs-clarifai-node-backend.onrender.com/api/createBlog/generate-titles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keywords }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        // Handle different response formats
        let titles = [];

        if (data.generated_content.titles) {
          // Format: { titles: ["title1", "title2", ...] }
          titles = data.generated_content.titles;
        } else if (data.generated_content.text) {
          // Format: { text: "content" } - Try to extract titles from text
          const textContent = data.generated_content.text;

          // Try to extract titles from numbered lists (e.g., "1. Title one\n2. Title two")
          const numberedTitles = textContent.match(
            /\d+\.\s+(.*?)(?=\n\d+\.|\n\n|$)/g
          );
          if (numberedTitles && numberedTitles.length > 0) {
            titles = numberedTitles.map((t: any) =>
              t.replace(/^\d+\.\s+/, "").trim()
            );
          } else {
            // Split by newlines as fallback
            titles = textContent
              .split("\n")
              .map((line: any) => line.trim())
              .filter((line: any) => line.length > 0 && !line.startsWith("#"));
          }
        } else if (Array.isArray(data.generated_content)) {
          // Format: ["title1", "title2", ...]
          titles = data.generated_content;
        } else {
          // Unknown format - create a single title from the content
          titles = ["Generated Title: " + keywords];
          console.warn("Unknown title format:", data.generated_content);
        }

        setBlogData({
          ...blogData,
          titles: titles,
          keywords,
        });

        toast({
          title: "Success",
          description: "Titles generated successfully!",
        });
      } else {
        throw new Error(data.message || "Failed to generate titles");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate titles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const selectTitle = (title: string) => {
    setBlogData({
      ...blogData,
      selectedTitle: title,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="keywords">Keywords</Label>
        <Input
          id="keywords"
          placeholder="Enter keywords separated by commas (e.g., sales, productivity, CRM)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>

      <Button onClick={generateTitles} disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Titles
          </>
        )}
      </Button>

      {blogData.titles && blogData.titles.length > 0 && (
        <div className="space-y-3">
          <Label>Select a title:</Label>
          <RadioGroup
            value={blogData.selectedTitle}
            onValueChange={selectTitle}
          >
            {blogData.titles.map((title: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={title} id={`title-${index}`} />
                <Label
                  htmlFor={`title-${index}`}
                  className="flex-1 cursor-pointer"
                >
                  {title}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    </div>
  );
}
