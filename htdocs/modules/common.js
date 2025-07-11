// ===== LOADING INDICATOR =====

export class LoadingIndicator {
    constructor() {
        this.uniqueId = "loading_indicator" + Date.now();
    }

    generateLoadingIndicator = (message, fontSize) => {
        const loadingIndicatorWrapper = document.createElement("div");
        loadingIndicatorWrapper.className = "loading_indicator_wrapper";
        loadingIndicatorWrapper.id = this.uniqueId;
        loadingIndicatorWrapper.style.fontSize = fontSize;

        const loadingIndicator = document.createElement("div");
        loadingIndicator.className = "loading_indicator";

        const loadingMessage = document.createElement("p");
        loadingMessage.textContent = message;

        loadingIndicatorWrapper.appendChild(loadingIndicator);
        loadingIndicatorWrapper.appendChild(loadingMessage);

        return loadingIndicatorWrapper;
    }

    removeLoadingIndicator = () => {
        const loadingIndicatorWrapper = document.getElementById(this.uniqueId);
        
        if(loadingIndicatorWrapper) {
            loadingIndicatorWrapper.remove();
        }
        else{
            console.log("[ERROR] Failed to find loadingIndicatorWrapper with ID: ", this.uniqueId);
        }
    }
}

