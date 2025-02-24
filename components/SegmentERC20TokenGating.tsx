// component: TokenGatingSegment
// <TokenGattingFieldSet form={form} />

import type React from "react";
import type { SegmentCookieMetaProps } from "@/components/types/CookieTypes";
import { useReadContracts } from "wagmi";
import { erc20Abi } from "viem";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TokenInput } from "./ui/token-input";
import {} from "wagmi";

const SegmentERC20TokenGating: React.FC<SegmentCookieMetaProps<any>> = ({
  form,
}) => {
  const {
    control,
    formState: { isValid },
    watch,
    setError,
    clearErrors,
    setValue,
  } = form;

  const { data: token } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: watch("erc20Token") as `0x${string}`,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: watch("erc20Token") as `0x${string}`,
        abi: erc20Abi,
        functionName: "symbol",
      },
    ],
  });
  const [decimals, symbol] = token || [18, ""];

  return (
    <fieldset className="grid grid-cols-4 gap-6 p-6">
      <div className="col-span-full space-y-2 lg:col-span-1">
        <p className="font-medium">Set Token Gating</p>
        <p className="text-xs">
          Provide the address of the ERC20 and the threshold balance to allow
          cookie withdrawals.
        </p>
      </div>
      <div className="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
        <FormField
          control={control}
          name="erc20Token"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>ERC20 Token</FormLabel>
              <FormControl>
                <Input
                  placeholder="0x5f207d42f869fd1c71d7f0f81a2a67fc20ff7323"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The token that will be used to gate cookie withdrawals
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="erc20Threshold"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>ERC20 Threshold</FormLabel>
              <FormControl>
                <TokenInput
                  setError={(val) => {
                    setError("erc20Threshold", {
                      type: "custom",
                      message: val,
                    });
                  }}
                  clearError={() => clearErrors("erc20Threshold")}
                  onChangeAmount={(val) => setValue("erc20Threshold", val)}
                  initialValue={field.value}
                  decimalPlaces={decimals}
                  symbol={symbol ?? ""}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The minimum balance of the ERC20 to allow cookie withdrawals (
                {field.value.toString()} WEI)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Collapsible className="col-span-full">
          <CollapsibleTrigger>✅ Gating token info ✅</CollapsibleTrigger>
          <CollapsibleContent>
            <p>
              <strong>Symbol</strong> {symbol}
            </p>
            <p>
              <strong>Decimals</strong> {decimals}
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </fieldset>
  );
};

export default SegmentERC20TokenGating;
