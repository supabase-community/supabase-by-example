import OAuthForm from "./oauth-form";

export default function SignIn() {
  return (
    <div className="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
      <h2 className="font-semibold text-4xl mb-4">Sign in</h2>
      <p className="font-medium mb-4">Hi, Welcome back</p>
      <div className="space-y-2">
        <a
          className="btn btn-outline border-gray-200 hover:bg-transparent hover:text-gray-500 gap-2 w-full normal-case no-animation"
          href="/auth/github"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0.184998C5.373 0.184998 0 5.558 0 12.185C0 17.808 3.872 22.513 9.092 23.815C9.036 23.653 9 23.465 9 23.232V21.181C8.513 21.181 7.697 21.181 7.492 21.181C6.671 21.181 5.941 20.828 5.587 20.172C5.194 19.443 5.126 18.328 4.152 17.646C3.863 17.419 4.083 17.16 4.416 17.195C5.031 17.369 5.541 17.791 6.021 18.417C6.499 19.044 6.724 19.186 7.617 19.186C8.05 19.186 8.698 19.161 9.308 19.065C9.636 18.232 10.203 17.465 10.896 17.103C6.9 16.692 4.993 14.704 4.993 12.005C4.993 10.843 5.488 9.719 6.329 8.772C6.053 7.832 5.706 5.915 6.435 5.185C8.233 5.185 9.32 6.351 9.581 6.666C10.477 6.359 11.461 6.185 12.495 6.185C13.531 6.185 14.519 6.359 15.417 6.668C15.675 6.355 16.763 5.185 18.565 5.185C19.297 5.916 18.946 7.841 18.667 8.779C19.503 9.724 19.995 10.845 19.995 12.005C19.995 14.702 18.091 16.689 14.101 17.102C15.199 17.675 16 19.285 16 20.498V23.232C16 23.336 15.977 23.411 15.965 23.5C20.641 21.861 24 17.421 24 12.185C24 5.558 18.627 0.184998 12 0.184998Z"
              fill="black"
              fillOpacity="0.6"
            />
          </svg>
          Sign in with GitHub
        </a>
        <a
          className="btn btn-outline border-gray-200 hover:bg-transparent hover:text-gray-500 gap-2 w-full normal-case no-animation"
          href="/auth/slack"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
          >
            <path
              fill="black"
              fillOpacity="0.6"
              d="M33 8a4 4 0 0 0-8 0v11a4 4 0 0 0 8 0V8zM43 19a4 4 0 0 1-4 4h-4v-4a4 4 0 0 1 8 0z"
            />
            <path
              fill="black"
              fillOpacity="0.6"
              d="M8 14a4 4 0 0 0 0 8h11a4 4 0 0 0 0-8H8zM19 4a4 4 0 0 1 4 4v4h-4a4 4 0 0 1 0-8z"
            />
            <path
              fill="black"
              fillOpacity="0.6"
              d="M14 39.006C14 41.212 15.791 43 18 43s4-1.788 4-3.994V28.022c0-2.206-1.791-3.994-4-3.994s-4 1.788-4 3.994v10.984zM4 28.022a3.997 3.997 0 0 1 4-3.994h4v3.994c0 2.206-1.791 3.994-4 3.994s-4-1.788-4-3.994z"
            />
            <path
              fill="black"
              fillOpacity="0.6"
              d="M39 33a4 4 0 0 0 0-8H28a4 4 0 0 0 0 8h11zM28 43a4 4 0 0 1-4-4v-4h4a4 4 0 0 1 0 8z"
            />
          </svg>
          Sign in with Slack
        </a>
        <a
          className="btn btn-outline border-gray-200 hover:bg-transparent hover:text-gray-500 gap-2 w-full normal-case no-animation"
          href="/auth/google"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24"
            height="24"
          >
            <path
              fill="black"
              fillOpacity="0.3"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="black"
              fillOpacity="0.3"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="black"
              fillOpacity="0.3"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="black"
              fillOpacity="0.3"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Sign in with Google
        </a>
        <a
          className="btn btn-outline border-gray-200 hover:bg-transparent hover:text-gray-500 gap-2 w-full normal-case no-animation"
          href="/auth/azure"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24"
            height="24"
          >
            <linearGradient
              id="k8yl7~hDat~FaoWq8WjN6a"
              x1="-1254.397"
              x2="-1261.911"
              y1="877.268"
              y2="899.466"
              gradientTransform="translate(1981.75 -1362.063) scale(1.5625)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#114a8b" />
              <stop offset="1" stopColor="#0669bc" />
            </linearGradient>
            <path
              fill="url(#k8yl7~hDat~FaoWq8WjN6a)"
              d="M17.634,6h11.305L17.203,40.773c-0.247,0.733-0.934,1.226-1.708,1.226H6.697 c-0.994,0-1.8-0.806-1.8-1.8c0-0.196,0.032-0.39,0.094-0.576L15.926,7.227C16.173,6.494,16.86,6,17.634,6L17.634,6z"
            />
            <path
              fill="#0078d4"
              d="M34.062,29.324H16.135c-0.458-0.001-0.83,0.371-0.831,0.829c0,0.231,0.095,0.451,0.264,0.608 l11.52,10.752C27.423,41.826,27.865,42,28.324,42h10.151L34.062,29.324z"
            />
            <linearGradient
              id="k8yl7~hDat~FaoWq8WjN6b"
              x1="-1252.05"
              x2="-1253.788"
              y1="887.612"
              y2="888.2"
              gradientTransform="translate(1981.75 -1362.063) scale(1.5625)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopOpacity=".3" />
              <stop offset=".071" stopOpacity=".2" />
              <stop offset=".321" stopOpacity=".1" />
              <stop offset=".623" stopOpacity=".05" />
              <stop offset="1" stopOpacity="0" />
            </linearGradient>
            <path
              fill="url(#k8yl7~hDat~FaoWq8WjN6b)"
              d="M17.634,6c-0.783-0.003-1.476,0.504-1.712,1.25L5.005,39.595 c-0.335,0.934,0.151,1.964,1.085,2.299C6.286,41.964,6.493,42,6.702,42h9.026c0.684-0.122,1.25-0.603,1.481-1.259l2.177-6.416 l7.776,7.253c0.326,0.27,0.735,0.419,1.158,0.422h10.114l-4.436-12.676l-12.931,0.003L28.98,6H17.634z"
            />
            <linearGradient
              id="k8yl7~hDat~FaoWq8WjN6c"
              x1="-1252.952"
              x2="-1244.704"
              y1="876.6"
              y2="898.575"
              gradientTransform="translate(1981.75 -1362.063) scale(1.5625)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#3ccbf4" />
              <stop offset="1" stopColor="#2892df" />
            </linearGradient>
            <path
              fill="url(#k8yl7~hDat~FaoWq8WjN6c)"
              d="M32.074,7.225C31.827,6.493,31.141,6,30.368,6h-12.6c0.772,0,1.459,0.493,1.705,1.224 l10.935,32.399c0.318,0.942-0.188,1.963-1.13,2.281C29.093,41.968,28.899,42,28.703,42h12.6c0.994,0,1.8-0.806,1.8-1.801 c0-0.196-0.032-0.39-0.095-0.575L32.074,7.225z"
            />
          </svg>
          Sign in with Azure
        </a>
      </div>
    </div>
  );
}
