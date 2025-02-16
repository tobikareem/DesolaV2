export interface PageContent {
    partitionKey: string;  // Represents the page (e.g., "Home", "FAQ/Supports")
    rowKey: string;        // Represents the section or question (e.g., "faq1")
    rowValue: string;      // The actual content or answer
    imagePath?: string;    // Optional image URL (if the section contains an image)
    additionalNotes?: string; // Extra notes about the data
}