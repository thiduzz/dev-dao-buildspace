import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x8758836fd9BA3276e4E3E6969eAD8FD5d088071a");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Golang Logo",
        description: "This NFT will give you access to DevDAO!",
        image: readFileSync("scripts/assets/gopher.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();