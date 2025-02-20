"use client";

import { Button } from "@/components/ui/button";

const SocialsToolbar = () => {
  return (
    <div className="fixed inset-x-0 bottom-4 flex items-center justify-center px-3">
      <div className="flex w-full max-w-fit items-end gap-x-2 rounded-lg border border-border bg-white px-4 py-3 shadow-lg">
        <Button variant="link" size="sm">
          Personaliser
        </Button>
        <Button variant="link" size="sm">
          Editer les matchs
        </Button>
        <Button variant="outline" size="sm">
          Exporter
        </Button>
      </div>
    </div>
  );
};

export { SocialsToolbar };
