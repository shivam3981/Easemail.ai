import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Sparkles, Copy, Check, Save } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const EmailGeneratorSimple = () => {
    const [prompt, setPrompt] = useState("");
    const [generatedEmail, setGeneratedEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("design");
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
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #e0e6ed;">
        <h1 style="color: #38bdf8;">Generated Email</h1>
        <p>${generatedContent.replace(/\n/g, "<br />")}</p>
        </div>
    `;

            setGeneratedEmail(formattedEmail);
            toast.success("Email generated successfully!");
            setActiveTab("preview");
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

    // Save generated email to backend
    const saveEmailToFile = async () => {
        if (!generatedEmail) return;

        try {
            await axios.post("/api/save-email", {
                html: generatedEmail,
                prompt,
            });
            toast.success("Email saved to backend!");
        } catch (error) {
            console.error("Error saving email:", error);
            toast.error("Failed to save email to backend.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-slate-800 rounded-lg shadow-lg">
                    <TabsTrigger value="design" className="data-[state=active]:bg-sky-700 data-[state=active]:text-white text-slate-300">Design</TabsTrigger>
                    <TabsTrigger value="preview" disabled={!generatedEmail} className="data-[state=active]:bg-sky-700 data-[state=active]:text-white text-slate-300">
                        Preview
                    </TabsTrigger>
                    <TabsTrigger value="code" disabled={!generatedEmail} className="data-[state=active]:bg-sky-700 data-[state=active]:text-white text-slate-300">
                        HTML Code
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="design">
                    <Card className="bg-slate-900 border-slate-700 shadow-xl">
                        <CardContent className="p-8">
                            <div className="space-y-8">
                                <div className="flex flex-col items-center mb-4 text-center">
                                    <div className="bg-gradient-to-tr from-sky-500 to-cyan-400 rounded-full p-3 mb-2 shadow-lg">
                                        <Sparkles className="h-7 w-7 text-white" />
                                    </div>
                                    <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Simple Email Generator</h1>
                                    <p className="text-slate-400 mt-2 text-base">
                                        Provide a simple prompt to generate a beautiful email template with AI.
                                    </p>
                                </div>

                                <Textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Enter a prompt, e.g., 'Generate a welcome email for new customers.'"
                                    rows={4}
                                    className="resize-none bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:ring-sky-500"
                                />

                                <Button
                                    onClick={generateEmail}
                                    className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold shadow-lg hover:from-sky-600 hover:to-cyan-500"
                                    disabled={loading}
                                >
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
                        <Card className="bg-slate-900 border-slate-700 shadow-xl">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-slate-100">Generated Email:</h2>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={saveEmailToFile}
                                            className="flex items-center gap-2 border-sky-500 text-sky-400 hover:bg-sky-900 hover:text-white"
                                        >
                                            <Save className="h-4 w-4" />
                                            Save
                                        </Button>
                                    </div>
                                </div>
                                <div
                                    className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg border border-slate-700 shadow-inner"
                                    style={{ minHeight: "180px" }}
                                    dangerouslySetInnerHTML={{ __html: generatedEmail }}
                                />
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="code">
                    {generatedEmail && (
                        <Card className="bg-slate-900 border-slate-700 shadow-xl">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-slate-100">HTML Code</h3>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={copyHtmlToClipboard}
                                        className="flex items-center gap-2 border-sky-500 text-sky-400 hover:bg-sky-900 hover:text-white"
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
                                <pre className="bg-slate-950 text-sky-200 p-6 rounded-lg overflow-auto max-h-[500px] text-sm border border-slate-800 shadow-inner">
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