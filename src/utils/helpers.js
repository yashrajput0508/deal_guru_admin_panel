export const convertByteToImage = (byteArray) => {
    const base64String = btoa(String.fromCharCode.apply(null, byteArray));

    // Create a data URL from the base64 string
    const imageUrl = `data:image/jpeg;base64,${base64String}`;

    return imageUrl;
};


export const convertImageToByteArray = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            const byteArray = new Uint8Array(arrayBuffer);

            resolve(byteArray);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsArrayBuffer(file);
    });
}
