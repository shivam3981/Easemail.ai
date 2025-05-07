const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema(
    {
        recipients: {
            type: [String],
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        emailType: {
            type: String,
            required: false,
        },
        companyName: {
            type: String,
            required: false,
        },
        headerText: {
            type: String,
            required: false,
        },
        subheaderText: {
            type: String,
            required: false,
        },
        mainContent: {
            type: String,
            required: false,
        },
        bullets: {
            type: [String],
            required: false,
        },
        ctaText: {
            type: String,
            required: false,
        },
        ctaUrl: {
            type: String,
            required: false,
        },
        footerText: {
            type: String,
            required: false,
        },
        logoUrl: {
            type: String,
            required: false,
        },
        sentAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Email", EmailSchema);