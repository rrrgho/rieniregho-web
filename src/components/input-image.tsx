import { ControllerRenderProps } from "react-hook-form";
import ImageOriginal from "./image-original";

const InputImage = ({
  id,
  field,
  disabled,
  height,
  width,
}: {
  id?: string;
  field: ControllerRenderProps<any>;
  disabled?: boolean;
  height?: string;
  width?: string;
}) => {
  const file = field.value;
  const previewUrl =
    file && typeof file !== "string" ? URL.createObjectURL(file) : file;
  return (
    <div
      className={`relative ${!width ? "w-full" : `w-[${width}px]`} ${
        !height ? "h-[400px]" : `h-[${height}px]`
      } border border-dashed rounded-md flex items-center justify-center bg-muted transition ${
        disabled
          ? "opacity-50 pointer-events-none cursor-not-allowed"
          : "cursor-pointer hover:bg-muted/70"
      }`}
      onClick={() =>
        !disabled && document.getElementById(id ?? "image_input")?.click()
      }
    >
      {/* If Image exists → Preview */}
      {previewUrl ? (
        <>
          <ImageOriginal alt="Preview" src={previewUrl} />

          {/* Delete Button */}
          <button
            type="button"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation(); // prevent re-triggering input click
              if (!disabled) {
                field.onChange(null);
              }
            }}
            className={`absolute top-1 right-1 rounded-full w-7 h-7 flex items-center justify-center text-xs ${
              disabled
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-black/60 hover:bg-black text-white"
            }`}
          >
            ✕
          </button>
        </>
      ) : (
        <span className="text-sm text-muted-foreground">
          Click to upload image
        </span>
      )}

      {/* Hidden Real Input */}
      <input
        id={id ?? "image_input"}
        type="file"
        accept="image/*"
        disabled={disabled}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          field.onChange(file ?? null);
        }}
      />
    </div>
  );
};

export default InputImage;
