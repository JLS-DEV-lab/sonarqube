import { useCallback, useState, RefCallback } from "react";

interface Translate {
  x: number;
  y: number;
}

/** Helper function to center binary trees using x and y coordinates
 * @prop {Translate} translate - The x and y coordinates to center the binary tree
 * returns {[Translate, RefCallback<HTMLDivElement>]} - Returns the x and y coordinates to center the binary tree and a ref callback function
 */

export const useCenteredTree = (): [Translate, RefCallback<HTMLDivElement>] => {
  const [translate, setTranslate] = useState<Translate>({ x: 0, y: 0 });

  const containerRef = useCallback<RefCallback<HTMLDivElement>>((containerElement) => {
    if (containerElement !== null) {
      const { width, height } = containerElement.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 4 });
    }
  }, []);

  return [translate, containerRef];
};
