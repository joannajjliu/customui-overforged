import Resolver from "@forge/resolver";

const resolver = new Resolver();

resolver.define("getText", (req) => {
  console.log(req);

  return "Hello, world! HIPPOS";
});

export const handler = resolver.getDefinitions();
