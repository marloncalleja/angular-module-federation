import bootstrap from "./bootstrap";
import PublicModule from "./public.module";

export default (await bootstrap(PublicModule)).instance;