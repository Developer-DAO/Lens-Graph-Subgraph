import { json, Bytes, dataSource } from "@graphprotocol/graph-ts";
import { MetadataOutput } from "../generated/schema";

export function handleMetadata(content: Bytes): void {
  let metadata = new MetadataOutput(dataSource.stringParam());
  const value = json.fromBytes(content).toObject();

  if (value) {
    const image = value.get("image");
    const name = value.get("name");
    const description = value.get("description");
    const content = value.get("content");

    if (name && image && description && content) {
      metadata.name = name.toString();
      metadata.image = image.toString();
      metadata.description = description.toString();
      metadata.content = content.toString();
    }

    metadata.save();
  }
}
