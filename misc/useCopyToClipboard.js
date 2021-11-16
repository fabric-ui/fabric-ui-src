import React from 'react'

export default function useCopyToClipboard(element) {
    return (text = undefined) => {
        let success = false
        const toCopy = text ? text : element?.textContent
        let copyRange, selection, copyRef

        try {
            copyRange = document.createRange();
            selection = document.getSelection();

            copyRef = document.createElement("span");
            copyRef.textContent = toCopy;

            copyRef.style.all = "unset";

            copyRef.style.position = "fixed";
            copyRef.style.top = 0;
            copyRef.style.clip = "rect(0, 0, 0, 0)";

            copyRef.style.whiteSpace = "pre";

            copyRef.style.userSelect = "text";
            copyRef.addEventListener("copy", function (e) {

                e.stopPropagation();
                e.preventDefault();
                e.clipboardData.clearData();
                e.clipboardData.setData("text/plain", text);
                e.preventDefault();
            });

            document.body.appendChild(copyRef);

            copyRange.selectNodeContents(copyRef);
            selection.addRange(copyRange);
            success = document.execCommand("copy")
        } catch (e) {
        } finally {
            if (selection) {
                if (typeof selection.removeRange == "function") {
                    selection.removeRange(copyRange);
                } else {
                    selection.removeAllRanges();
                }
            }

            if (copyRef)
                document.body.removeChild(copyRef);
        }

        return success

    }
}
