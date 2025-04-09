
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

const Journal: React.FC = () => {
  const [journalEntry, setJournalEntry] = useState("");

  const handleClear = () => {
    if (journalEntry.trim()) {
      setJournalEntry("");
      toast({
        title: "Journal entry cleared",
        description: "Your journal entry has been cleared from memory",
      });
    }
  };

  const handleSave = () => {
    // In a real app, this would save to local storage or database
    // Here we just show a toast to maintain privacy principles
    if (journalEntry.trim()) {
      toast({
        title: "Session recorded",
        description: "Your journal entry is saved for this session only",
      });
    } else {
      toast({
        title: "Empty entry",
        description: "Please write something before saving",
        variant: "destructive",
      });
    }
  };

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Journal</CardTitle>
            <CardDescription>
              Write your thoughts and feelings here. Remember, nothing is saved after you close or refresh the page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ScrollArea className="h-[50vh] w-full rounded-md border p-4">
                <Textarea
                  placeholder="Start writing here..."
                  className="w-full h-full min-h-[50vh] border-0 focus-visible:ring-0 resize-none bg-transparent p-0"
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                />
              </ScrollArea>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleClear}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save for this session
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Journal;
