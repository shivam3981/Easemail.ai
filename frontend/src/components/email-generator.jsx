"use client"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Loader2, Copy, Check, Upload, Sparkles, RefreshCw, Download, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import EmailPreview from "@/components/email-preview"
import { templates, colorThemes } from "@/lib/email-data"
import { toast } from "react-hot-toast"
import { CldUploadWidget } from 'next-cloudinary';
import axios from "axios"; // Import Axios for API calls

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

// Cloudinary configuration
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function EmailGenerator() {
  const [formData, setFormData] = useState({
    emailType: "business",
    companyName: "",
    headerText: "",
    subheaderText: "",
    mainContent: "",
    ctaText: "Learn More",
    ctaUrl: "https://example.com",
    accentColor: "#0ea5e9",
    logoUrl: "",
    footerText: "",
  })

  const [generatedEmail, setGeneratedEmail] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [bgImage, setBgImage] = useState(null)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("design")
  const [logoPreview, setLogoPreview] = useState(null)
  const [recipients, setRecipients] = useState(""); // New state for recipients

  // Set generated email when form data changes to ensure preview updates
  useEffect(() => {
    if (generatedEmail) {
      setGeneratedEmail({
        ...generatedEmail,
        logoUrl: formData.logoUrl,
      })
    }
  }, [formData.logoUrl])

  // Handle input changes for all form fields
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (result) => {
    try {
      const imageUrl = result.info.secure_url;
      console.log("Cloudinary upload successful:", imageUrl);
      setFormData((prev) => ({ ...prev, logoUrl: imageUrl }));
      setLogoPreview(imageUrl);
      toast.success("Logo uploaded successfully");
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const handleBgUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setBgImage(event.target.result.toString())
          toast.success("Background image uploaded successfully")
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Generate email content using Google Generative AI
  const generateEmail = async () => {
    setLoading(true)
    try {
      const prompt = `
        You are a professional email copywriter with expertise in creating engaging, conversion-optimized email content.
        
        CREATE A ${formData.emailType.toUpperCase()} EMAIL WITH THE FOLLOWING DETAILS:
        
        COMPANY: ${formData.companyName}
        HEADER: ${formData.headerText}
        SUBHEADER: ${formData.subheaderText}
        REQUESTED CONTENT: ${formData.mainContent}
        CALL-TO-ACTION: ${formData.ctaText}
        FOOTER: ${formData.footerText}
        
        GUIDELINES:
        - Write in a professional, engaging tone appropriate for ${formData.emailType} communications
        - Keep paragraphs short and scannable (2-3 sentences max)
        - Include personalized elements and benefit-focused language
        - Create compelling content that drives the reader toward the CTA: "${formData.ctaText}"
        - Include 1-2 relevant bullet points highlighting key benefits or features if appropriate
        - Total length should be 3-4 short paragraphs maximum
        - Do not include any HTML tags or formatting instructions
        - Do not include salutations like "Dear Customer" or signatures
        - Focus on clear, concise messaging that resonates with the target audience
        
        SPECIFIC EMAIL TYPE INSTRUCTIONS:
        ${formData.emailType === "business" ? "Focus on professional tone, business benefits, and ROI. Emphasize credibility and value proposition." : ""}
        ${formData.emailType === "event" ? "Create excitement and urgency. Highlight event details, benefits of attending, and limited availability if applicable." : ""}
        ${formData.emailType === "realestate" ? "Highlight property features, location benefits, and market value. Create a sense of opportunity and exclusivity." : ""}
        ${formData.emailType === "confirmation" ? "Provide clear confirmation details, next steps, and a reassuring tone. Include any important deadlines or requirements." : ""}
        ${formData.emailType === "newsletter" ? "Present information in an engaging, valuable way. Include enticing preview of the main content without exhausting the topic." : ""}
        ${formData.emailType === "welcome" ? "Warm, friendly tone with clear next steps. Express appreciation and set expectations for the relationship moving forward." : ""}
        ${formData.emailType === "product" ? "Focus on unique product benefits, not just features. Address pain points and show how the product solves specific problems." : ""}
        ${formData.emailType === "promotion" ? "Create urgency and excitement. Clearly communicate the offer, any deadlines, and the value proposition of taking immediate action." : ""}
        ${formData.emailType === "thankyou" ? "Express genuine appreciation, reinforce the relationship value, and suggest subtle next steps without being pushy." : ""}
        ${formData.emailType === "holiday" ? "Capture seasonal spirit while remaining professional. Balance warmth with appropriate business context." : ""}
        
        Return only the final email body content.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const generatedContent = response.text()

      // Create a new email object with all current form data
      setGeneratedEmail({
        ...formData,
        mainContent: generatedContent || formData.mainContent,
      })

      setActiveTab("preview")
      toast.success("Email generated successfully!")
    } catch (err) {
      console.error("Error generating email:", err)
      toast.error("Error generating email. Please try again or check your API key.")
    } finally {
      setLoading(false)
    }
  }

  // Reset the form fields and preview output
  const handleReset = () => {
    setFormData({
      emailType: "business",
      companyName: "",
      headerText: "",
      subheaderText: "",
      mainContent: "",
      ctaText: "Learn More",
      ctaUrl: "https://example.com",
      accentColor: "#0ea5e9",
      logoUrl: "",
      footerText: "",
    })
    setGeneratedEmail(null)
    setSelectedTheme(null)
    setBgImage(null)
    setLogoPreview(null)
    setActiveTab("design")

    toast.success("Form reset. All fields have been cleared.")
  }

  const copyHtmlToClipboard = () => {
    if (!generatedEmail) return

    const htmlCode = generateHtmlCode(generatedEmail, selectedTheme)
    navigator.clipboard.writeText(htmlCode)
    setCopied(true)

    toast.success("HTML copied to clipboard. You can now paste it into your email marketing tool.")

    setTimeout(() => setCopied(false), 2000)
  }

  // New function for copying rich text format for email clients
  // This function already exists in your code, but we need to make sure it's working correctly
  const copyRichTextForEmail = async () => {
    if (!generatedEmail) return

    // Generate the rich text HTML with inline styles
    const richTextHtml = generateRichTextForEmailClients(generatedEmail, selectedTheme)

    try {
      // Use the modern Clipboard API
      const type = "text/html"
      const blob = new Blob([richTextHtml], { type })
      const data = [new ClipboardItem({ [type]: blob })]

      await navigator.clipboard.write(data)

      if (formData.logoUrl) {
        toast.success(
          "Email content copied. NOTE: The logo will NOT appear when pasted into Gmail - you will need to add it manually after pasting.",
          { duration: 6000 },
        )
      } else {
        toast.success("Email content copied. You can now paste it directly into Gmail or other email clients.")
      }
    } catch (err) {
      console.error("Failed to copy: ", err)

      // Fallback to the older method if the Clipboard API fails
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = richTextHtml
      tempDiv.style.position = "absolute"
      tempDiv.style.left = "-9999px"

      document.body.appendChild(tempDiv)

      const range = document.createRange()
      range.selectNodeContents(tempDiv)

      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)

      let success = false
      try {
        success = document.execCommand("copy")
      } catch (err) {
        console.error("Copy command failed: ", err)
      }

      selection.removeAllRanges()
      document.body.removeChild(tempDiv)

      if (success) {
        if (formData.logoUrl) {
          toast.success(
            "Email content copied. NOTE: The logo will NOT appear when pasted into Gmail - you will need to add it manually after pasting.",
            
          )
        } else {
          toast.success("Email content copied. You can now paste it into your email client.")
        }
      } else {
        toast.error("Failed to copy email content. Please try again or use the HTML code tab.")
      }
    }
  }

  // Download the HTML file
  const downloadHtmlFile = () => {
    if (!generatedEmail) return

    const htmlCode = generateHtmlCode(generatedEmail, selectedTheme)
    const blob = new Blob([htmlCode], { type: "text/html" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${formData.emailType}-email-template.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.success("HTML file downloaded successfully.")
  }

  // Function to send the email
  const sendEmail = async () => {
    if (!generatedEmail || !recipients) {
      toast.error("Please generate an email and provide recipients.");
      return;
    }

    try {
      const emailData = {
        recipients: recipients.split(",").map((email) => email.trim()), // Split and trim recipient emails
        subject: formData.headerText || "Your Email Subject",
        body: generateRichTextForEmailClients(generatedEmail, selectedTheme), // Use the generated rich text
      };

      // Send the email data to the backend API
      await axios.post("/api/send-email", emailData);

      toast.success("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    }
  };

  // Creates a simplified rich text version that can be pasted into email clients
  const generateRichTextForEmailClients = (data, themeIndex) => {
    const styles = templateStyles[data.emailType]
    const themeColors = themeIndex !== null ? colorThemes[themeIndex] : null
    const primaryColor = themeColors ? themeColors[0] : data.accentColor
    const buttonColor = themeColors ? themeColors[2] : data.accentColor
    const textColor = "#333333"

    const backgroundStyle = bgImage
      ? `background-color: ${styles.backgroundColor || "#f7f7f7"};`
      : themeColors
        ? `background-color: ${themeColors[0]};`
        : `background-color: ${styles.backgroundColor || "#f7f7f7"};`

    // Use a styled text-based placeholder for the logo
    const logoHtml = data.companyName
      ? `<div style="text-align: center; margin-bottom: 25px;">
        <div style="display: inline-block; width: 60px; height: 60px; background-color: ${
          buttonColor || "#0ea5e9"
        }; border-radius: 50%; line-height: 60px; text-align: center; font-size: 24px; font-weight: bold; color: white;">
          ${data.companyName.charAt(0).toUpperCase()}
        </div>
        ${data.companyName ? `<div style="margin-top: 8px; font-weight: bold;">${data.companyName}</div>` : ""}
      </div>`
      : ""

    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px; ${backgroundStyle}">
      ${logoHtml}
      <h1 style="font-size: 24px; font-weight: bold; color: ${textColor}; ${
    data.emailType === "holiday" || data.emailType === "promotion" ? "text-align: center;" : ""
  }">${data.headerText}</h1>
      <h2 style="font-size: 18px; color: #666; margin-top: 10px; ${
        data.emailType === "holiday" || data.emailType === "promotion" ? "text-align: center;" : ""
      }">${data.subheaderText}</h2>
      <div style="margin-top: 20px; color: #444; line-height: 1.5; ${
        data.emailType === "holiday" ? "text-align: center;" : ""
      }">
        ${data.mainContent.replace(/\n/g, "<br/>")}
      </div>
      <div style="text-align: center; margin-top: 25px; margin-bottom: 25px;">
        <a href="${
          data.ctaUrl
        }" style="display: inline-block; padding: 12px 24px; background-color: ${buttonColor}; color: white; text-decoration: none; border-radius: ${
    data.emailType === "event" || data.emailType === "promotion" ? "24px" : "4px"
  }; font-weight: 500;">${data.ctaText}</a>
      </div>
      ${
        data.footerText
          ? `<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px; text-align: center;">${data.footerText}</div>`
          : ""
      }
    </div>
  `
  }

  const generateHtmlCode = (data, themeIndex) => {
    const themeColors = themeIndex !== null ? colorThemes[themeIndex] : null
    const primaryColor = themeColors ? themeColors[0] : data.accentColor

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${data.headerText || "Email Template"}</title>
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; }
    .email-${data.emailType} { 
      padding: 30px; 
      background-color: ${
        data.emailType === "business" || data.emailType === "corporate"
          ? "#f7f7f7"
          : data.emailType === "event"
            ? "#f0f9f0"
            : data.emailType === "realestate"
              ? "#fff9f0"
              : data.emailType === "confirmation"
                ? "#f0f7ff"
                : data.emailType === "newsletter"
                  ? "#f8f5ff"
                  : data.emailType === "welcome"
                    ? "#fffbeb"
                    : data.emailType === "product"
                      ? "#eef2ff"
                      : data.emailType === "promotion"
                        ? "#fef2f2"
                        : data.emailType === "thankyou"
                          ? "#f0fdfa"
                          : data.emailType === "holiday"
                            ? "#f0f7ff"
                            : "#f0f7ff"
      }; 
    }
    .header { 
      font-size: 24px; 
      font-weight: bold; 
      color: #333;
      ${data.emailType === "holiday" || data.emailType === "promotion" ? "text-align: center;" : ""}
    }
    .subheader { 
      font-size: 18px; 
      color: #666; 
      margin-top: 10px;
      ${data.emailType === "holiday" || data.emailType === "promotion" ? "text-align: center;" : ""}
    }
    .content { 
      margin-top: 20px; 
      color: #444; 
      line-height: 1.5;
      ${data.emailType === "holiday" ? "text-align: center;" : ""}
    }
    .logo-container {
      text-align: center;
      margin-bottom: 25px;
    }
    .logo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
    }
    .cta-button { 
      display: inline-block; 
      padding: 12px 24px; 
      background-color: ${primaryColor}; 
      color: white; 
      text-decoration: none; 
      border-radius: ${data.emailType === "event" || data.emailType === "promotion" ? "24px" : "4px"}; 
      font-weight: 500;
      margin-top: 25px;
    }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="email-${data.emailType}">
      ${data.logoUrl ? `
      <div class="logo-container">
        <img src="${data.logoUrl}" alt="${data.companyName || 'Company Logo'}" class="logo">
      </div>
      ` : data.companyName ? `
      <div class="logo-container">
        <div style="display: inline-block; width: 60px; height: 60px; background-color: ${primaryColor}; border-radius: 50%; line-height: 60px; text-align: center; font-size: 24px; font-weight: bold; color: white;">
          ${data.companyName.charAt(0).toUpperCase()}
        </div>
      </div>
      ` : ''}
      <h1 class="header">${data.headerText}</h1>
      <h2 class="subheader">${data.subheaderText}</h2>
      <div class="content">
        ${data.mainContent.replace(/\n/g, "<br/>")}
      </div>
      <div style="text-align: center;">
        <a href="${data.ctaUrl}" class="cta-button">${data.ctaText}</a>
      </div>
      ${data.footerText ? `<div class="footer">${data.footerText}</div>` : ""}
    </div>
  </div>
</body>
</html>`
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 max-w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-sky-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 drop-shadow">AI Email Generator</h1>
        </div>
        <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
          Create beautiful, responsive emails in minutes with AI-powered content generation
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-slate-800 rounded-lg shadow-lg">
          <TabsTrigger value="design" className="data-[state=active]:bg-sky-700 data-[state=active]:text-white text-slate-300 text-xs sm:text-base">Design</TabsTrigger>
          <TabsTrigger value="preview" disabled={!generatedEmail} className="data-[state=active]:bg-sky-700 data-[state=active]:text-white text-slate-300 text-xs sm:text-base">
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" disabled={!generatedEmail} className="data-[state=active]:bg-sky-700 data-[state=active]:text-white text-slate-300 text-xs sm:text-base">
            HTML Code
          </TabsTrigger>
        </TabsList>

        {/* Responsive grid: stack on mobile, side-by-side on lg+ */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <TabsContent value="design" className="mt-0 col-span-1">
            <Card className="bg-slate-900 border-slate-700 shadow-xl w-full">
              <CardContent className="p-4 sm:p-8">
                <div className="space-y-8">
                  {/* Template Type */}
                  <div>
                    <Label htmlFor="emailType" className="text-base font-semibold text-slate-200 mb-2 block">
                      Template Type
                    </Label>
                    <Select value={formData.emailType} onValueChange={(value) => handleChange("emailType", value)}>
                      <SelectTrigger className="mt-1.5 bg-slate-800 border-slate-700 text-slate-100 w-full">
                        <SelectValue placeholder="Select a template type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-slate-100 max-h-72 overflow-y-auto">
                        <div className="flex flex-col gap-1 py-1">
                          {Object.entries(templates).map(([key, template]) => (
                            <SelectItem
                              key={key}
                              value={key}
                              className="hover:bg-sky-900 px-3 py-2 rounded transition-colors"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{template.name}</span>
                                <span className="text-xs text-slate-400">{template.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Company Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName" className="text-slate-200">Company Name</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        placeholder="Your Company"
                        className="mt-1.5 bg-slate-800 border-slate-700 text-slate-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="logo" className="text-slate-200">Company Logo</Label>
                      <div className="mt-1.5 flex items-center gap-4">
                        <div className="relative">
                          <CldUploadWidget
                            uploadPreset={UPLOAD_PRESET}
                            onSuccess={handleImageUpload}
                            options={{
                              maxFiles: 1,
                              maxFileSize: 2000000,
                              resourceType: "image",
                              clientAllowedFormats: ["image"]
                            }}
                          >
                            {({ open }) => (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => open()}
                                className="flex items-center gap-2 border-sky-500 text-sky-400 hover:bg-sky-900 hover:text-white"
                              >
                                <Upload className="h-4 w-4" />
                                <span>Upload</span>
                              </Button>
                            )}
                          </CldUploadWidget>
                        </div>
                        {logoPreview && (
                          <div className="relative h-10 w-10 overflow-hidden rounded-md border border-slate-700">
                            <img
                              src={logoPreview}
                              alt="Company logo"
                              className="h-full w-full object-contain"
                              onError={(e) => {
                                console.error("Logo preview failed to load")
                                e.target.src = "/placeholder.svg"
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Header & Subheader */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="headerText" className="text-slate-200">Header Text</Label>
                      <Input
                        id="headerText"
                        value={formData.headerText}
                        onChange={(e) => handleChange("headerText", e.target.value)}
                        placeholder="Announcing Our New Service"
                        className="mt-1.5 bg-slate-800 border-slate-700 text-slate-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subheaderText" className="text-slate-200">Subheader Text</Label>
                      <Input
                        id="subheaderText"
                        value={formData.subheaderText}
                        onChange={(e) => handleChange("subheaderText", e.target.value)}
                        placeholder="Take your business to the next level"
                        className="mt-1.5 bg-slate-800 border-slate-700 text-slate-100"
                      />
                    </div>
                  </div>

                  {/* Main Content */}
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mainContent" className="text-slate-200">Main Content</Label>
                      <Badge variant="outline" className="font-normal border-sky-500 text-sky-400">
                        AI-powered
                      </Badge>
                    </div>
                    <Textarea
                      id="mainContent"
                      value={formData.mainContent}
                      onChange={(e) => handleChange("mainContent", e.target.value)}
                      placeholder="Enter the main body of your email here or let AI generate it for you..."
                      rows={6}
                      className="mt-1.5 resize-none bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:ring-sky-500"
                    />
                  </div>

                  {/* CTA */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="ctaText" className="text-slate-200">Call-to-Action Text</Label>
                      <Input
                        id="ctaText"
                        value={formData.ctaText}
                        onChange={(e) => handleChange("ctaText", e.target.value)}
                        placeholder="Learn More"
                        className="mt-1.5 bg-slate-800 border-slate-700 text-slate-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ctaUrl" className="text-slate-200">Call-to-Action URL</Label>
                      <Input
                        id="ctaUrl"
                        type="url"
                        value={formData.ctaUrl}
                        onChange={(e) => handleChange("ctaUrl", e.target.value)}
                        placeholder="https://example.com"
                        className="mt-1.5 bg-slate-800 border-slate-700 text-slate-100"
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div>
                    <Label htmlFor="footerText" className="text-slate-200">Footer Text</Label>
                    <Input
                      id="footerText"
                      value={formData.footerText}
                      onChange={(e) => handleChange("footerText", e.target.value)}
                      placeholder="© 2025 Your Company. All rights reserved."
                      className="mt-1.5 bg-slate-800 border-slate-700 text-slate-100"
                    />
                  </div>

                  <Separator className="bg-slate-700" />

                  {/* Accent Color & Theme */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="block mb-2 text-slate-200">Accent Color</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="color"
                          value={formData.accentColor}
                          onChange={(e) => handleChange("accentColor", e.target.value)}
                          className="w-12 h-8 sm:w-16 sm:h-10 p-1 cursor-pointer border-slate-700"
                        />
                        <span className="text-sm text-slate-400">{formData.accentColor}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="block mb-2 text-slate-200">Color Theme</Label>
                      <div className="flex flex-wrap gap-2 sm:gap-4">
                        {colorThemes.map((theme, index) => (
                          <div
                            key={index}
                            className={cn(
                              "cursor-pointer rounded-md p-1 border-2 transition-all",
                              selectedTheme === index
                                ? "border-sky-500 scale-105"
                                : "border-transparent hover:border-slate-600",
                            )}
                            onClick={() => setSelectedTheme(index)}
                          >
                            <div className="flex">
                              {theme.map((color, i) => (
                                <div
                                  key={i}
                                  className="w-5 h-5 sm:w-6 sm:h-6 first:rounded-l-sm last:rounded-r-sm"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Background Image */}
                  <div>
                    <Label htmlFor="bgImage" className="block mb-2 text-slate-200">
                      Background Image (optional)
                    </Label>
                    <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                      <Input id="bgImage" type="file" accept="image/*" onChange={handleBgUpload} className="sr-only" />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("bgImage")?.click()}
                        className="flex items-center gap-2 border-sky-500 text-sky-400 hover:bg-sky-900 hover:text-white"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Upload background</span>
                      </Button>
                      {bgImage && <span className="text-sm text-green-400">Background image uploaded</span>}
                    </div>
                  </div>

                  {/* Recipients */}
                  <div>
                    <Label htmlFor="recipients" className="text-slate-200">Recipients</Label>
                    <Textarea
                      id="recipients"
                      value={recipients}
                      onChange={(e) => setRecipients(e.target.value)}
                      placeholder="Enter recipient email addresses, separated by commas"
                      rows={2}
                      className="mt-1.5 resize-none bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:ring-sky-500"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <Button
                      onClick={generateEmail}
                      className="flex-1 bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold shadow-lg hover:from-sky-600 hover:to-cyan-500"
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

                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="flex items-center gap-2 border-sky-500 text-sky-400 hover:bg-sky-900 hover:text-white"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Reset
                    </Button>

                    <Button
                      onClick={sendEmail}
                      className="flex items-center gap-2 bg-gradient-to-r from-sky-700 to-cyan-600 text-white hover:from-sky-800 hover:to-cyan-700"
                    >
                      <Mail className="h-4 w-4" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview and Code panels: span 2 columns on xl+, full width on mobile */}
          <TabsContent value="preview" className="mt-0 col-span-1 xl:col-span-2">
            {generatedEmail && (
              <Card className="bg-slate-900 border-slate-700 shadow-xl w-full">
                <CardContent className="p-0 overflow-hidden">
                  <div className="bg-slate-800 p-3 sm:p-4 border-b border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <h3 className="font-medium text-slate-100 text-base sm:text-lg">Email Preview</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyRichTextForEmail}
                        className="flex items-center gap-2 border-sky-500 text-sky-400 hover:bg-sky-900 hover:text-white"
                      >
                        <Mail className="h-4 w-4" />
                        Copy for Email Client
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-3 sm:p-6 overflow-x-auto">
                    <EmailPreview data={generatedEmail} selectedTheme={selectedTheme} bgImage={bgImage} />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="code" className="mt-0 col-span-1 xl:col-span-2">
            {generatedEmail && (
              <Card className="bg-slate-900 border-slate-700 shadow-xl w-full">
                <CardContent className="p-3 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-100">HTML Code</h3>
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
                  <div className="relative">
                    <pre className="bg-slate-950 text-sky-200 p-3 sm:p-6 rounded-lg overflow-auto max-h-[400px] sm:max-h-[500px] text-xs sm:text-sm border border-slate-800 shadow-inner">
                      {generateHtmlCode(generatedEmail, selectedTheme)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

const templateStyles = {
  business: {
    backgroundColor: "#f7f7f7",
    headerColor: "#333",
    subheaderColor: "#666",
    contentColor: "#444",
  },
  event: {
    backgroundColor: "#f0f9f0",
    headerColor: "#333",
    subheaderColor: "#666",
    contentColor: "#444",
  },
  realestate: {
    backgroundColor: "#fff9f0",
    headerColor: "#333",
    subheaderColor: "#666",
    contentColor: "#444",
  },
  confirmation: {
    backgroundColor: "#f0f7ff",
    headerColor: "#333",
    subheaderColor: "#666",
    contentColor: "#444",
  },
  newsletter: {
    backgroundColor: "#f8f5ff",
    headerColor: "#333",
    subheaderColor: "#666",
    contentColor: "#444",
  },
  welcome: {
    backgroundColor: "#fffbeb",
    headerColor: "#333",
    subheaderColor: "#666",
    contentColor: "#444",
  },
  product: {
    backgroundColor: "#eef2ff",
    headerColor: "#333",
    subheaderColor: "#666",
    contentColor: "#444",
  },
  promotion: {
    backgroundColor: "#fef2f2",
    headerColor: "#333",
    subheaderColor: "#666",
    contentColor: "#444",
  },
  thankyou: {
    backgroundColor: "#f0fdfa",
    headerColor: "#333",
    subheaderColor: "#666",
    contentColor: "#444",
  },
  holiday: {
    backgroundColor: "#f0f7ff",
    headerColor: "#333",
    subheaderColor: "#666",
    contentColor: "#444",
  },
}
