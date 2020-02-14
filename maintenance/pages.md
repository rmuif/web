# Pages

RMUIF uses React Router for its routing solution and can be found in `Router.js` as `Router`. It includes protected routes and error handling by default.

## Protected routes

The template includes two examples of protected routes, `/auth` and `/admin`, the former requires the user to be signed in and the latter the user to both be signed in and have the administrator role, as you can see depicted here:

{% tabs %}
{% tab title="Router.js" %}
```jsx
<Route path="/auth">
  {user ? <AuthContent /> : <Redirect to="/" />}
</Route>

<Route path="/admin">
  {user && roles.includes("admin") ? (
    <AdminContent />
  ) : (
    <Redirect to="/" />
  )}
</Route>
```
{% endtab %}
{% endtabs %}

## Error handling

Whenever a user navigates to a path that doesn’t exist, i.e. a route that is not defined, `NotFoundContent` is displayed. This logic derives from the `Switch` component by React Router and the route for 404 is defined as follows:

{% tabs %}
{% tab title="Router.js" %}
```jsx
<Route>
  <NotFoundContent />
</Route>
```
{% endtab %}
{% endtabs %}

If you want to change the 404 page, the best place to start is the `NotFoundContent` component.

## Add new page

Adding a new page might seem daunting at first but it’s actually pretty easy, however, there are some simple steps you need to complete.

### Content component

The first step in adding a new page is to create the content component, i.e. the content to display when the user navigates to your route. In this little guide we’ll use a page for a list of rooms as an example.

For the list of rooms, we’ll need to create one directory and three files:

* /RoomContent
  * index.js
  * RoomContent.js
  * RoomContent.test.js

So the first step is to create a directory for your component in the `/src` directory, it should follow the naming scheme `PageNameContent` where `PageName` is the name of your page. There are two files that follow the same scheme, `PageNameContent.js` and `PageNameContent.test.js`, where the former is the actual component and the latter the test file for the component:

{% tabs %}
{% tab title="RoomContent.js" %}
```javascript
import React from "react";

function RoomContent() {
  return null;
}

export default RoomContent;
```
{% endtab %}

{% tab title="RoomContent.test.js" %}
```javascript
import React from "react";
import ReactDOM from "react-dom";

import RoomContent from "./RoomContent";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<RoomContent />, div);

  ReactDOM.unmountComponentAtNode(div);
});
```
{% endtab %}
{% endtabs %}

The `index.js` file is used to simplify importing your component later, it’s where we export the default module from the directory:

{% tabs %}
{% tab title="index.js" %}
```jsx
export { default } from "./RoomContent";
```
{% endtab %}
{% endtabs %}

### Routing

After you’ve created the required files, you can go ahead and add a new route in `Router`:

{% tabs %}
{% tab title="Router.js" %}
```jsx
import RoomContent from "../RoomContent";

<Route path="/rooms">
  {user ? <RoomContent /> : <Redirect to="/" />}
</Route>
```
{% endtab %}
{% endtabs %}

Now, when navigating to `/rooms` you’ll see an empty page. I’ll leave the rest to you.

