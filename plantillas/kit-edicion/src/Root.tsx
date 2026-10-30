import { CalculateMetadataFunction, Composition, staticFile } from "remotion";
import { Reel } from "./reel/Reel";
import { ClipData, ReelProps } from "./reel/types";

type Props = ReelProps & { dataFile: string };

const FPS = 30;

// Lee el archivo que crea scripts/analyze.py y ajusta la duración del reel.
const calculateMetadata: CalculateMetadataFunction<Props> = async ({ props }) => {
  const data: ClipData = await fetch(staticFile(props.dataFile)).then((r) => r.json());
  return {
    durationInFrames: Math.max(1, Math.ceil(data.outputDuration * FPS)),
    props: { ...props, data },
  };
};

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Reel"
    component={Reel as React.FC<Props>}
    calculateMetadata={calculateMetadata}
    durationInFrames={FPS}
    fps={FPS}
    width={1080}
    height={1920}
    defaultProps={{
      // Cambia "mi-clip" por el nombre de tu archivo (sin extensión).
      dataFile: "data/mi-clip.json",
      data: { clip: "", sourceDuration: 0, outputDuration: 0, segments: [], words: [] },
      hook: "Tu gancho aquí",
      label: "",
    }}
  />
);
