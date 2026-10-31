// ============================================================================
// Yashraj Jewellers - Cloudinary Image Upload & Storage Service
// Handles direct upload to Cloudinary CDN and returns high-resolution URL strings
// ============================================================================

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

const STORAGE_KEY_CLOUD_NAME = "yj_cloudinary_cloud_name";
const STORAGE_KEY_PRESET = "yj_cloudinary_upload_preset";

// Default fallback configuration (can be customized in Admin > Cloudinary Settings)
export const DEFAULT_CLOUDINARY_CONFIG: CloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
};

export function getCloudinaryConfig(): CloudinaryConfig {
  if (typeof window === "undefined") {
    return DEFAULT_CLOUDINARY_CONFIG;
  }

  const savedCloudName = localStorage.getItem(STORAGE_KEY_CLOUD_NAME);
  const savedPreset = localStorage.getItem(STORAGE_KEY_PRESET);

  return {
    cloudName: savedCloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
    uploadPreset: savedPreset || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
  };
}

export function saveCloudinaryConfig(cloudName: string, uploadPreset: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_CLOUD_NAME, cloudName.trim());
  localStorage.setItem(STORAGE_KEY_PRESET, uploadPreset.trim());
}

export function isCloudinaryConfigured(): boolean {
  const config = getCloudinaryConfig();
  return Boolean(config.cloudName && config.uploadPreset);
}

export interface UploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

/**
 * Uploads an image File directly to Cloudinary CDN via unsigned upload API.
 * Returns the permanent HTTPS string URL.
 */
export async function uploadImageToCloudinary(
  file: File,
  customConfig?: CloudinaryConfig
): Promise<UploadResult> {
  const config = customConfig || getCloudinaryConfig();

  if (!config.cloudName || !config.uploadPreset) {
    return {
      success: false,
      error: "Cloudinary Cloud Name or Upload Preset is missing. Please configure them in Cloudinary Settings.",
    };
  }

  const url = `https://api.cloudinary.com/v1_1/${config.cloudName.trim()}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", config.uploadPreset.trim());
  formData.append("folder", "yashraj-jewellers/products");

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      const msg = errorJson.error?.message || `Cloudinary upload failed with HTTP status ${res.status}`;
      return { success: false, error: msg };
    }

    const data = await res.json();
    const secureUrl = data.secure_url || data.url;

    if (!secureUrl) {
      return { success: false, error: "Cloudinary did not return a valid secure URL." };
    }

    return {
      success: true,
      url: secureUrl,
      publicId: data.public_id,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Network error during Cloudinary upload";
    return { success: false, error: errorMsg };
  }
}
