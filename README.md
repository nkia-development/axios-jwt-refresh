# axios-jwt-reissue

**axios-jwt-reissue** is a library that simplifies the automatic refresh of authorization tokens via axios interceptors. With this library, you can seamlessly intercept failed requests due to expired tokens, refresh the authorization, and continue with the original request without any user interaction.

When a request fails due to authorization issues, axios-jwt-reissue allows you to define what happens next. You can either trigger a refresh call to obtain a new authorization token or implement custom logic to handle the failure.

Additionally, axios-jwt-reissue queues any additional requests that arrive while the token is being refreshed, ensuring they are resolved with the new token once it’s available.

This version incorporates your library name, “axios-jwt-reissue,” and presents the features in a way that highlights its role in managing JWT token reissues within axios-based applications.
