# axios-jwt-refresh

![alt text](image.png)

<img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MDNfMjA0%2FMDAxNjg4MzcxNjk5ODA5.SK0SBh1I_XkTabbUVwB6UBR3WGm1XEy7H7hibk9L2k0g.dFBe6VQqk2edHy3lVLy3rtsi64S7Nks9fyY0Wa7BUpwg.PNG.h970303%2Fimage.png&type=sc960_832">

**axios-jwt-refresh** is a library that simplifies the automatic refresh of authorization tokens via axios interceptors. With this library, you can seamlessly intercept failed requests due to expired tokens, refresh the authorization, and continue with the original request without any user interaction.

When a request fails due to authorization issues, axios-jwt-refresh allows you to define what happens next. You can either trigger a refresh call to obtain a new authorization token or implement custom logic to handle the failure.

Additionally, axios-jwt-refresh queues any additional requests that arrive while the token is being refreshed, ensuring they are resolved with the new token once it’s available.

This version incorporates your library name, “axios-jwt-refresh,” and presents the features in a way that highlights its role in managing JWT token reissues within axios-based applications.

## Key Features

- **Automatic Token Refresh:** Automatically intercept failed HTTP requests due to expired tokens and trigger a refresh request to obtain a new authorization token.
- **Customizable Logic:** Easily define what should happen after a token expires—whether it's issuing a refresh call or handling the failure with custom logic.
- **Request Queueing:** When a token refresh is in progress, any additional requests that come in are queued and resolved once the new token is available, ensuring smooth and consistent user experiences.
- **Easy Integration:** Integrates effortlessly with existing axios instances, requiring minimal setup to get started.

## Installation

Install the library using npm:

```bash
npm install axios-jwt-refresh
```

## Contributing

We welcome contributions to improve axios-jwt-refresh. If you’d like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on our GitHub repository.

> Note: This library was previously named axios-jwt-reissue and has been renamed to axios-jwt-refresh for better clarity and ease of use. Please update your dependencies accordingly.
