import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const API_BASE_URL = "http://localhost:5001/api";

const ClassWebsiteInput = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrapedContent, setScrapedContent] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/scrape`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, method: "static" }),
      });

      if (!response.ok) {
        throw new Error("Failed to scrape website");
      }

      const data = await response.json();
      setScrapedContent(data.content);

      // Generate calendar
      const calendarResponse = await fetch(
        `${API_BASE_URL}/generate-calendar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: data.content }),
        }
      );

      if (!calendarResponse.ok) {
        throw new Error("Failed to generate calendar");
      }

      const calendarData = await calendarResponse.json();

      // Download CSV
      const blob = new Blob([calendarData.content], { type: "text/csv" });
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "course_calendar.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);

      toast({
        title: "Success",
        description: "Calendar generated and downloaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCalendar = () => {
    toast({
      title: "Google Calendar",
      description: "Events are being added to your Google Calendar...",
    });

    // In a real implementation, this would use the Google Calendar API
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "All events have been added to your Google Calendar.",
      });
    }, 1500);
  };

  return (
    <section className="py-12 px-4 md:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 shadow-md border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="url"
                className="text-sm font-medium text-slate-700"
              >
                Enter your class website URL
              </label>
              <div className="flex gap-2">
                <Input
                  id="url"
                  type="url"
                  placeholder="https://www.university.edu/class/cs101"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                  disabled={loading}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Generate Calendar"
                  )}
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                Works with most university course websites. We'll scan the page
                for dates, times, and event details.
              </p>
            </div>
          </form>

          {scrapedContent && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">
                Scraped Content Preview
              </h3>
              <div className="mt-2 max-h-60 overflow-y-auto rounded-md bg-gray-50 p-4 text-sm text-gray-500">
                {scrapedContent.substring(0, 500)}...
              </div>
            </div>
          )}
        </Card>

        <div className="mt-8 p-4 bg-slate-50 rounded-md border border-slate-200">
          <h3 className="text-lg font-medium mb-2">How it works</h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-700">
            <li>Paste your class website URL (syllabus, course page, etc.)</li>
            <li>Our system scans the page and extracts all class events</li>
            <li>Review the extracted events</li>
            <li>Click "Add to Google Calendar" to sync all events</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ClassWebsiteInput;
