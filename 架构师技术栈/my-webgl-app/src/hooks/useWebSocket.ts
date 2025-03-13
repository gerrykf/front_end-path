import { ref, onUnmounted } from "vue";

export function useWebSocket(
  callback: (data: { x: number; y: number }) => void
) {
  const ws = ref<WebSocket | null>(null);
  const isConnected = ref(false);
  let reconnectTimer: any = null;
  let mockInterval: any = null;

  const connect = () => {
    if (ws.value) return; // 避免重复连接

    ws.value = new WebSocket("wss://echo.websocket.org");

    ws.value.onopen = () => {
      isConnected.value = true;
      console.log("✅ WebSocket 连接成功");
    };

    ws.value.onmessage = (event) => {
      console.log("📡 收到 WebSocket 数据:", event.data);

      if (typeof event.data === "string" && event.data.trim().startsWith("{")) {
        try {
          const newData = JSON.parse(event.data);

          if (typeof newData === "object" && "x" in newData && "y" in newData) {
            callback(newData);
          } else {
            console.warn("⚠️ WebSocket JSON 数据格式不匹配:", newData);
          }
        } catch (e) {
          console.error(
            "❌ WebSocket JSON 解析失败:",
            e,
            "原始数据:",
            event.data
          );
        }
      } else {
        console.warn("⚠️ WebSocket 返回了非 JSON 数据，忽略:", event.data);
      }
    };

    ws.value.onerror = (error) => {
      console.error("❌ WebSocket 错误:", error);
    };

    ws.value.onclose = () => {
      console.log("🔄 WebSocket 连接关闭，5 秒后尝试重连...");
      isConnected.value = false;
      ws.value = null;

      // 避免重复定时器
      if (!reconnectTimer) {
        reconnectTimer = setTimeout(() => {
          reconnectTimer = null;
          connect(); // 5 秒后重连
        }, 5000);
      }
    };
  };

  connect(); // 立即连接 WebSocket

  // **本地模拟数据（1 秒推送一次）**
  mockInterval = setInterval(() => {
    if (isConnected.value) {
      const mockData = JSON.stringify({
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
      ws.value?.send(mockData);
    }
  }, 1000);

  // **组件卸载时清理**
  onUnmounted(() => {
    console.log("🛑 组件卸载，关闭 WebSocket...");
    if (ws.value) {
      ws.value.close();
      ws.value = null;
    }
    if (reconnectTimer) clearTimeout(reconnectTimer);
    if (mockInterval) clearInterval(mockInterval);
  });

  return {
    isConnected,
    send: (message: string) => {
      if (ws.value && isConnected.value) {
        ws.value.send(message);
      } else {
        console.warn("⚠️ WebSocket 未连接，消息发送失败");
      }
    },
  };
}
