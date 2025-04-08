
export interface MessageAnalysis {
    needsDate: boolean;
    needsLocation: boolean;
    needsClass: boolean;
    needsRoute: boolean;
}

export const analyzeLastMessage = (message?: string): MessageAnalysis => {
    if (!message) {
        return {
            needsDate: false,
            needsLocation: false,
            needsClass: false,
            needsRoute: false,
        };
    }

    return {
        needsDate: message.includes('date'),
        needsLocation: message.includes('flying') || message.includes('destination'),
        needsClass: message.includes('class'),
        needsRoute: message.includes('route'),
    };
};
