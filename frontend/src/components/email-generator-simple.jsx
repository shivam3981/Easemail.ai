import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
import { toast } from "react-hot-toast";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const EmailGeneratorSimple = () => {
    const [prompt, setPrompt] = useState("");
    const [generatedEmail, setGeneratedEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("design"); // State for active tab
    const [copied, setCopied] = useState(false);

    const generateEmail = async () => {
        if (!prompt.trim()) {
            toast.error("Please provide a prompt.");
            return;
        }

        setLoading(true);
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const generatedContent = response.text();

            // Wrap the generated content in a basic HTML structure
            const formattedEmail = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #0ea5e9;">Generated Email</h1>
        <p>${generatedContent.replace(/\n/g, "<br />")}</p>
        </div>
    `;

            setGeneratedEmail(formattedEmail);
            toast.success("Email generated successfully!");
            setActiveTab("preview"); // Switch to the Preview tab
        } catch (err) {
            console.error("Error generating email:", err);
            toast.error("Failed to generate email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const copyHtmlToClipboard = () => {
        if (!generatedEmail) return;

        navigator.clipboard.writeText(generatedEmail);
        setCopied(true);
        toast.success("HTML copied to clipboard!");

        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                    <TabsTrigger value="design">Design</TabsTrigger>
                    <TabsTrigger value="preview" disabled={!generatedEmail}>
                        Preview
                    </TabsTrigger>
                    <TabsTrigger value="code" disabled={!generatedEmail}>
                        HTML Code
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="design">
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="flex flex-col items-center mb-4 text-center">
                                    <Sparkles className="h-6 w-6 text-sky-500" />
                                    <h1 className="text-2xl font-bold text-slate-800">Simple Email Generator</h1>
                                    <p className="text-slate-600 mt-2">
                                        Provide a simple prompt to generate an email template.
                                    </p>
                                </div>

                                <Textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Enter a prompt, e.g., 'Generate a welcome email for new customers.'"
                                    rows={4}
                                    className="resize-none"
                                />

                                <Button onClick={generateEmail} className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            Generate Email
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="preview">
                    {generatedEmail && (
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-lg font-semibold mb-2">Generated Email:</h2>
                                <div
                                    className="bg-gray-100 p-4 rounded-md"
                                    dangerouslySetInnerHTML={{ __html: generatedEmail }}
                                />
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="code">
                    {generatedEmail && (
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">HTML Code</h3>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={copyHtmlToClipboard}
                                        className="flex items-center gap-2"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="h-4 w-4" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-4 w-4" />
                                                Copy HTML
                                            </>
                                        )}
                                    </Button>
                                </div>
                                <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-auto max-h-[500px] text-sm">
                                    {generatedEmail}
                                </pre>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default EmailGeneratorSimple;