import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

// SanityImageSource type definition
type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

// Get image URL with specific dimensions
export function getImageUrl(source: SanityImageSource, width?: number, height?: number) {
    let imageBuilder = builder.image(source);

    if (width) {
        imageBuilder = imageBuilder.width(width);
    }
    if (height) {
        imageBuilder = imageBuilder.height(height);
    }

    return imageBuilder.auto("format").url();
}

// Get blur placeholder for image
export function getImageBlurUrl(source: SanityImageSource) {
    return builder.image(source).width(20).quality(20).blur(50).url();
}
