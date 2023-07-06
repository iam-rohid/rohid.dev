import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export default createReader(process.cwd(), keystaticConfig);
