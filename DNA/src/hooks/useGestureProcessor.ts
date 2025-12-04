import { useEffect, useRef } from 'react';
import { useGestureStore } from '../stores/gestureStore';
import { useDNAStore } from '../stores/dnaStore';
import { interpretGestures } from '../components/hand-tracking/GestureInterpreter';
import { smoothValue } from '../utils/math/smoothing';
import { SMOOTHING } from '../constants/gestureThresholds';

/**
 * Hook that processes hand data into gestures and applies them to DNA state
 */
export function useGestureProcessor() {
  const {
    leftHand,
    rightHand,
    setGesture,
    setNavigation,
    setZoom,
    setRotation,
    setExpansion,
    setPinch,
  } = useGestureStore();

  const {
    navigate,
    setZoom: setDNAZoom,
    rotate,
    setExpansion: setDNAExpansion,
    setHighlightedBase,
  } = useDNAStore();

  // Track previous values for smoothing
  const prevNavigation = useRef({ x: 0, y: 0, z: 0 });
  const prevZoom = useRef(1);
  const prevRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Interpret current gestures
    const result = interpretGestures(
      leftHand?.landmarks || null,
      rightHand?.landmarks || null,
      prevNavigation.current
    );

    // Update gesture store
    setGesture(result.gesture, result.strength);
    setPinch(result.pinchActive ? result.pinchPosition : null, result.pinchActive);

    // Apply smoothing to values
    const smoothedNavigation = {
      x: smoothValue(prevNavigation.current.x, result.navigation.x, SMOOTHING.navigation),
      y: smoothValue(prevNavigation.current.y, result.navigation.y, SMOOTHING.navigation),
      z: smoothValue(prevNavigation.current.z, result.navigation.z, SMOOTHING.navigation),
    };
    prevNavigation.current = smoothedNavigation;
    setNavigation(smoothedNavigation);

    const smoothedZoom = smoothValue(prevZoom.current, result.zoom, SMOOTHING.zoom);
    prevZoom.current = smoothedZoom;
    setZoom(smoothedZoom);

    const smoothedRotation = {
      x: smoothValue(prevRotation.current.x, result.rotation.x, SMOOTHING.rotation),
      y: smoothValue(prevRotation.current.y, result.rotation.y, SMOOTHING.rotation),
    };
    prevRotation.current = smoothedRotation;
    setRotation({ ...smoothedRotation, z: 0 });

    setExpansion(result.expansion);

    // Apply gestures to DNA state
    switch (result.gesture) {
      case 'navigating':
        // Use Y navigation to scroll through DNA
        navigate(smoothedNavigation.y * 0.5);
        break;

      case 'zooming':
        setDNAZoom(smoothedZoom / 10); // Scale down for reasonable zoom
        break;

      case 'rotating':
        rotate({
          x: smoothedRotation.x * 0.02,
          y: smoothedRotation.y * 0.02,
          z: 0,
        });
        break;

      case 'expanding':
        setDNAExpansion(result.expansion);
        break;

      case 'selecting':
        if (result.pinchPosition) {
          // Map pinch position to base pair index
          // This is simplified - in a real app you'd raycast into the 3D scene
          const baseIndex = Math.floor(result.pinchPosition.y * 50);
          setHighlightedBase(baseIndex);
        }
        break;
    }
  }, [
    leftHand,
    rightHand,
    setGesture,
    setNavigation,
    setZoom,
    setRotation,
    setExpansion,
    setPinch,
    navigate,
    setDNAZoom,
    rotate,
    setDNAExpansion,
    setHighlightedBase,
  ]);
}
