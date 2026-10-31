import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const cloudName =
      (formData.get("cloudName") as string) ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset =
      (formData.get("uploadPreset") as string) ||
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
      process.env.CLOUDINARY_UPLOAD_PRESET;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided." },
        { status: 400 }
      );
    }

    if (!cloudName || !uploadPreset) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cloudinary credentials missing. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local or Admin Settings.",
        },
        { status: 400 }
      );
    }

    // Forward to Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", uploadPreset);
    cloudinaryFormData.append("folder", "yashraj-jewellers/products");

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: cloudinaryFormData,
      }
    );

    const cloudinaryData = await cloudinaryRes.json();

    if (!cloudinaryRes.ok) {
      return NextResponse.json(
        {
          success: false,
          error: cloudinaryData.error?.message || "Cloudinary upload failed",
        },
        { status: cloudinaryRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      url: cloudinaryData.secure_url || cloudinaryData.url,
      publicId: cloudinaryData.public_id,
      format: cloudinaryData.format,
      bytes: cloudinaryData.bytes,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
