import { FC, useMemo } from "react";
import * as Slider from "@radix-ui/react-slider";
import * as Label from "@radix-ui/react-label";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FaInfo } from "react-icons/fa";

type MarginInputProps = {
  value: number;
  onChange: (value: number) => void;
  defaultValue?: number;
};

const MarginInput: FC<MarginInputProps> = ({
  value,
  onChange,
}) => {
  const isOpen = useMemo(() => {
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <div className="flex flex-col gap-2">
      <Label.Root
        className="flex flex-row items-center gap-2 text-[13px] font-semibold"
        htmlFor="margin"
      >
        Marge
        <Tooltip.Provider>
          <Tooltip.Root delayDuration={0}>
            <Tooltip.Trigger asChild>
              <div className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-gray-400">
                <FaInfo className="h-2" />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                sideOffset={5}
              >
                <p>
                  Notre marge est de <strong>6.5%</strong> par défaut.{" "}
                </p>
                <p>Vous pouvez la modifier à votre guise.</p>
                <Tooltip.Arrow className="fill-white" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </Label.Root>
      <Slider.Root
        value={[value]}
        className="relative flex h-5 w-full touch-none select-none items-center"
        defaultValue={[6.5]}
        max={20}
        step={0.1}
        aria-label="Volume"
        onValueChange={(value) => onChange(value[0] as number)}
      >
        <Slider.Track className="relative h-[2px] grow rounded-full bg-black/20">
          <Slider.Range className="absolute h-full rounded-full bg-black/20" />
        </Slider.Track>

        <Tooltip.Provider>
          <Tooltip.Root open={isOpen}>
            <Tooltip.Trigger asChild>
              <Slider.Thumb className="shadow-blackA7 hover:bg-violet3 focus:shadow-blackA8 block h-3 w-3 rounded-[10px] bg-white shadow-[0_2px_10px] focus:shadow-[0_0_0_5px] focus:outline-none" />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                sideOffset={5}
              >
                {value}%
                <Tooltip.Arrow className="fill-white" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </Slider.Root>
    </div>
  );
};

export default MarginInput;
