import React, { useRef, useState, useEffect } from "react";
import { Slider, Popover } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";

const WIDGET_WIDTH = 60;
const WIDGET_HEIGHT = 120;
const FONT_WEIGHTS = [300, 400, 500, 600, 700, 800, 900];

const AccessibilityWidget = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: window.innerHeight / 2 - WIDGET_HEIGHT / 2,
  });
  const [side, setSide] = useState("left");
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const widgetRef = useRef(null);

  // خواندن مقادیر از localStorage یا مقدار پیش فرض
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem("fontSize");
    return saved ? parseInt(saved, 10) : 16;
  });

  const [fontWeight, setFontWeight] = useState(() => {
    const saved = localStorage.getItem("fontWeight");
    return saved ? parseInt(saved, 10) : 400;
  });

  // ذخیره و اعمال وزن فونت به body با !important
  useEffect(() => {
    localStorage.setItem("fontWeight", fontWeight);
    document.body.style.setProperty("font-weight", fontWeight, "important");
    return () => {
      document.body.style.removeProperty("font-weight");
    };
  }, [fontWeight]);

  // ذخیره و اعمال اندازه فونت به body با !important
  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
    document.body.style.setProperty("font-size", fontSize + "px", "important");

    return () => {
      document.body.style.removeProperty("font-size");
    };
  }, [fontSize]);

  const [popoverVisible, setPopoverVisible] = useState(false);

  const onMouseDown = (e) => {
    if (popoverVisible) return;
    if (widgetRef.current && e.button === 0) {
      const rect = widgetRef.current.getBoundingClientRect();
      setDragging(true);
      setRel({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      e.preventDefault();
    }
  };

  const onMouseMove = (e) => {
    if (dragging) {
      let newX = e.clientX - rel.x;
      let newY = e.clientY - rel.y;
      newY = Math.max(0, Math.min(window.innerHeight - WIDGET_HEIGHT, newY));
      newX = Math.max(0, Math.min(window.innerWidth - WIDGET_WIDTH, newX));
      setPosition({ x: newX, y: newY });
    }
  };

  const onMouseUp = (e) => {
    setDragging(false);
    const mouseX = e.clientX;
    const middle = window.innerWidth / 2;
    let finalX;
    let newSide;
    if (mouseX < middle) {
      finalX = 0;
      newSide = "left";
    } else {
      finalX = window.innerWidth - WIDGET_WIDTH;
      newSide = "right";
    }
    setPosition((prev) => ({
      x: finalX,
      y: prev.y,
    }));
    setSide(newSide);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    // eslint-disable-next-line
  }, [dragging, rel]);

  const popoverContent = (
    <div style={{ minWidth: 220, direction: "rtl" }}>
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 16,
            color: "#888",
            marginBottom: 8,
            fontWeight: 400,
            textAlign: "right",
          }}
        >
          اندازه قلم
        </div>
        <Slider
          min={12}
          max={20}
          value={fontSize}
          onChange={setFontSize}
          style={{ width: 160 }}
          tooltip={{ open: false }}
        />
      </div>
      <div>
        <div
          style={{
            fontSize: 16,
            color: "#888",
            marginBottom: 8,
            fontWeight: 400,
            textAlign: "right",
          }}
        >
          ضخامت متن
        </div>
        <Slider
          min={0}
          max={FONT_WEIGHTS.length - 1}
          value={FONT_WEIGHTS.indexOf(fontWeight)}
          onChange={(val) => setFontWeight(FONT_WEIGHTS[val])}
          marks={{
            0: "۳۰۰",
            2: "۵۰۰",
            4: "۷۰۰",
            6: "۹۰۰",
          }}
          step={1}
          style={{ width: 160 }}
          tooltip={{ open: false }}
        />
      </div>
    </div>
  );

  return (
    <div
      ref={widgetRef}
      className="accessibility-widget"
      onMouseDown={onMouseDown}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 9999,
        userSelect: "none",
        width: WIDGET_WIDTH,
        borderRadius: 12,
        overflow: "visible",
        background: "white",
        boxShadow: dragging ? "0 0 16px #aaa" : "0 2px 8px #8882",
        cursor: popoverVisible ? "default" : dragging ? "grabbing" : "grab",
        transition: dragging
          ? "none"
          : "left 0.3s, right 0.3s, box-shadow 0.2s, top 0.3s",
      }}
    >
      <div
        className="rounded-t-lg"
        style={{
          width: "100%",
          height: 36,
          background: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #eee",
          fontSize: 18,
          color: "#888",
          transition: "background 0.2s",
          cursor: popoverVisible ? "default" : dragging ? "grabbing" : "grab",
        }}
      >
        <MenuOutlined />
      </div>
      <div className="flex flex-col items-center py-2 relative">
        <Popover
          content={popoverContent}
          trigger="click"
          placement={side === "left" ? "right" : "left"}
          open={popoverVisible}
          onOpenChange={setPopoverVisible}
        >
          <button
            type="button"
            aria-label="دسترسی ویژه"
            className="w-full h-full"
            style={{
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <Icon
              className="w-full"
              icon="ph:magic-wand"
              color="#3b82f6"
              height="32"
            />
          </button>
        </Popover>
      </div>
    </div>
  );
};

export default AccessibilityWidget;
