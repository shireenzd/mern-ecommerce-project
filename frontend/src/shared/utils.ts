export const parseJwt = (token: string) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const getReadableDate = (timestamp:string) => {
    const dateString = timestamp ;
    const date = new Date(dateString);

    // Format the date as a readable string with just the date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // @ts-ignore
    return date.toLocaleDateString('en-US', options);
}