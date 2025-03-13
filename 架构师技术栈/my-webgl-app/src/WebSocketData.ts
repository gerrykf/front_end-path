import { ref, onUnmounted } from "vue";

export function useWebSocket(
  callback: (data: number) => void,
  url = "wss://echo.websocket.org" // 默认使用 WebSocket 回显测试服务器
) {
  const ws = ref<WebSocket | null>(null);
  const isConnected = ref(false);

  const connect = () => {
    if (ws.value) return; // 避免重复连接

    ws.value = new WebSocket(url);

    ws.value.onopen = () => {
      isConnected.value = true;
      console.log("WebSocket 连接成功:", url);
    };

    ws.value.onmessage = (event) => {
      const newData = parseFloat(event.data);
      if (!isNaN(newData)) {
        callback(newData);
      }
    };

    ws.value.onerror = (error) => {
      console.error("WebSocket 错误:", error);
    };

    ws.value.onclose = () => {
      console.log("WebSocket 连接关闭，5 秒后尝试重连...");
      isConnected.value = false;
      ws.value = null;
      setTimeout(connect, 5000); // 5 秒后自动重连
    };
  };

  connect(); // 立即连接 WebSocket

  // 组件卸载时，关闭 WebSocket 连接
  onUnmounted(() => {
    if (ws.value) {
      ws.value.close();
      ws.value = null;
    }
  });

  return {
    isConnected,
    send: (message: string) => {
      if (ws.value && isConnected.value) {
        ws.value.send(message);
      } else {
        console.warn("WebSocket 未连接，消息发送失败");
      }
    },
  };
}
