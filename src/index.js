import Resolver from "@forge/resolver";
import api, { route } from "@forge/api";

const resolver = new Resolver();

resolver.define("getText", async (req) => {
  const response = await api.asApp().requestJira(route`/rest/api/3/search`);
  const data = await response.json();
  console.log("number of issues", data.total);

  console.log(req);
  console.log(`Project key ${req.context.extension.project.key}`);

  return `Hello, world! HIPPOS ${req.context.extension.project.key}`;
});

resolver.define("getUsers", async (req) => {
  // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-users/#api-rest-api-3-users-search-get
  const response = await api
    .asApp()
    .requestJira(route`/rest/api/3/users/search`);
  const data = await response.json();

  return "Hello, world!";
});

export const handler = resolver.getDefinitions();
