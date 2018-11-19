import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

let uri: string = "http://jsonplaceholder.typicode.com/comments";

interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

let placeholder: HTMLDivElement = <HTMLDivElement>document.getElementById("placeholder");
placeholder.innerHTML = "Waiting for data ..."; 

axios.get<IComment[]>(uri)
    .then(function (response: AxiosResponse<IComment[]>): void {
        addToDOM(response.data);
    })
    .catch(function (error: AxiosError): void {
        console.log(JSON.stringify(error));
        placeholder.innerHTML = JSON.stringify(error);
    });


function addToDOM(comments: IComment[]): void {
    comments.forEach((comment: IComment) => {
        let button: HTMLButtonElement = document.createElement<"button">("button");
        button.innerHTML = comment.id + " " + comment.email + ": " + comment.name;
        button.classList.add("collapsible");
        placeholder.appendChild(button);

        let content: HTMLDivElement = document.createElement<"div">("div");
        content.classList.add("content");
        content.style.maxHeight = "0px"; // do not any space on the screen
        content.style.visibility = "hidden"; // content not shown
        content.innerHTML = comment.body;
        placeholder.appendChild(content);

        button.addEventListener("click", () => {
            // console.log("clicked " + content.style.visibility + " more");
            if (content.style.visibility === "visible") {
                content.style.visibility = "hidden";
                content.style.maxHeight = "0px";
            } else {
                content.style.visibility = "visible";
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}