"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { useStore, Widget as WidgetType } from "@/store/useStore";

interface WidgetProps {
  widget: WidgetType;
}

export const Widget = ({ widget }: WidgetProps) => {
  const { updateWidgetPosition } = useStore();
  const ref = useRef<HTMLDivElement>(null);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    updateWidgetPosition(widget.id, {
      x: widget.position.x + info.offset.x,
      y: widget.position.y + info.offset.y,
    });
  };

  const renderContent = () => {
    switch (widget.type) {
      case "clock":
        return <ClockWidget />;
      case "weather":
        return <WeatherWidget />;
      case "calendar":
        return <CalendarWidget />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={ref}
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05, zIndex: 40 }}
      className="absolute cursor-grab active:cursor-grabbing pointer-events-auto"
      style={{ left: widget.position.x, top: widget.position.y }}
    >
      {renderContent()}
    </motion.div>
  );
};

const ClockWidget = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-40 h-40 rounded-[2rem] bg-white/20 backdrop-blur-xl border border-white/20 shadow-lg flex flex-col items-center justify-center text-white">
      <div className="text-4xl font-light tracking-tighter">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
      <div className="text-sm font-medium opacity-80 uppercase tracking-widest mt-1">
        {time.toLocaleDateString([], { weekday: "short" })}
      </div>
    </div>
  );
};

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<{
    location: string;
    temperature: number;
    condition: string;
    high: number;
    low: number;
    icon: string;
    isLoading: boolean;
    error: string | null;
  }>({
    location: "Loading...",
    temperature: 0,
    condition: "Loading",
    high: 0,
    low: 0,
    icon: "☀️",
    isLoading: true,
    error: null,
  });

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  // Get user's location
  useEffect(() => {
    console.log("Attempting to get location...");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Got GPS location:", position.coords);
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        async (error) => {
          console.error("GPS location error:", error);
          // Try IP-based location immediately
          await fetchIPBasedLocation();
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 300000,
        }
      );
    } else {
      console.log("Geolocation not supported, using IP location");
      fetchIPBasedLocation();
    }
  }, []);

  // Get approximate location based on IP
  const fetchIPBasedLocation = async () => {
    try {
      console.log("Fetching IP-based location...");
      const response = await fetch("https://ipapi.co/json/");
      if (!response.ok) throw new Error("Failed to get IP location");

      const data = await response.json();
      console.log("IP location data:", data);

      setUserLocation({
        lat: data.latitude,
        lon: data.longitude,
      });

      // Update location name immediately
      setWeatherData((prev) => ({
        ...prev,
        location: data.city || data.region || "Your Location",
      }));
    } catch (error) {
      console.error("Error getting IP location:", error);
      // Fallback to London as default
      setUserLocation({ lat: 51.5074, lon: -0.1278 });
      setWeatherData((prev) => ({
        ...prev,
        location: "London",
      }));
    }
  };

  // Fetch weather data when location is available
  useEffect(() => {
    if (!userLocation) {
      console.log("No user location yet, waiting...");
      return;
    }

    console.log("Fetching weather for:", userLocation);

    const fetchWeatherData = async () => {
      try {
        setWeatherData((prev) => ({ ...prev, isLoading: true, error: null }));

        // Use WeatherAPI.com as primary (in metric/Celsius)
        const weatherApiKey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${userLocation.lat},${userLocation.lon}&aqi=no`
        );

        console.log("Weather API response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Weather API error:", errorText);

          // Try OpenWeatherMap as fallback
          await tryOpenWeatherMap();
          return;
        }

        const data = await response.json();
        console.log("Weather API success:", data);

        // Get proper icon based on condition
        const hour = new Date().getHours();
        const isDaytime = hour >= 6 && hour < 18;
        const icon = getWeatherIconFromCondition(
          data.current.condition.text,
          isDaytime
        );

        setWeatherData({
          location:
            data.location?.name || data.location?.region || "Your Location",
          temperature: Math.round(data.current.temp_c), // Celsius
          condition: data.current.condition.text,
          high: Math.round(data.current.temp_c + 3), // Approximate high in Celsius
          low: Math.round(data.current.temp_c - 3), // Approximate low in Celsius
          icon: icon,
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        console.error("Error fetching weather:", error);
        // Last resort: use actual real-time weather from a public API
        await fetchRealTimeWeather();
      }
    };

    const tryOpenWeatherMap = async () => {
      try {
        console.log("Trying OpenWeatherMap...");
        const openWeatherKey =
          process.env.NEXT_PUBLIC_OPENWEATHERMAP_KEY ||
          "ba263010769d7f0a1013243279961893"; // Fallback key
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.lon}&units=metric&appid=${openWeatherKey}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("OpenWeatherMap success:", data);

          const hour = new Date().getHours();
          const isDaytime = hour >= 6 && hour < 18;
          const icon = getWeatherIconFromCode(data.weather[0].id, isDaytime);

          setWeatherData({
            location: data.name || "Your Location",
            temperature: Math.round(data.main.temp), // Celsius
            condition: data.weather[0].main,
            high: Math.round(data.main.temp_max), // Celsius
            low: Math.round(data.main.temp_min), // Celsius
            icon: icon,
            isLoading: false,
            error: null,
          });
        } else {
          throw new Error("OpenWeatherMap failed");
        }
      } catch (error) {
        console.error("OpenWeatherMap failed:", error);
        throw error;
      }
    };

    const fetchRealTimeWeather = async () => {
      try {
        console.log("Fetching real-time weather from public API...");

        // Use Open-Meteo API with Celsius (no API key needed)
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${userLocation.lat}&longitude=${userLocation.lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Open-Meteo success:", data);

          // Get location name
          let cityName = "Your Location";
          try {
            const geoResponse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation.lat}&lon=${userLocation.lon}`
            );
            if (geoResponse.ok) {
              const geoData = await geoResponse.json();
              cityName =
                geoData.address?.city ||
                geoData.address?.town ||
                geoData.address?.village ||
                geoData.address?.county ||
                "Your Location";
            }
          } catch (geoError) {
            console.log("Reverse geocoding failed");
          }

          const hour = new Date().getHours();
          const isDaytime = hour >= 6 && hour < 18;
          const icon = getWeatherIconFromCode(
            data.current.weather_code,
            isDaytime
          );
          const condition = getWeatherCondition(data.current.weather_code);

          setWeatherData({
            location: cityName,
            temperature: Math.round(data.current.temperature_2m), // Celsius
            condition: condition,
            high: Math.round(data.daily.temperature_2m_max[0]), // Celsius
            low: Math.round(data.daily.temperature_2m_min[0]), // Celsius
            icon: icon,
            isLoading: false,
            error: null,
          });
        } else {
          throw new Error("All weather APIs failed");
        }
      } catch (error: any) {
        console.error("All weather APIs failed:", error);
        setWeatherData((prev) => ({
          ...prev,
          error: "Weather service unavailable",
          isLoading: false,
          location: "Service Down",
        }));
      }
    };

    fetchWeatherData();

    // Refresh weather data every 15 minutes
    const interval = setInterval(fetchWeatherData, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [userLocation]);

  // Helper functions (keep the same as before)
  const getWeatherIconFromCondition = (
    condition: string,
    isDaytime: boolean
  ): string => {
    const cond = condition.toLowerCase();

    if (cond.includes("sunny") || cond.includes("clear")) {
      return isDaytime ? "☀️" : "🌙";
    }
    if (cond.includes("partly cloudy")) {
      return isDaytime ? "⛅" : "☁️";
    }
    if (cond.includes("cloud") || cond.includes("overcast")) {
      return "☁️";
    }
    if (cond.includes("rain") || cond.includes("drizzle")) {
      if (cond.includes("light")) return "🌦️";
      return "🌧️";
    }
    if (cond.includes("storm") || cond.includes("thunder")) {
      return "⛈️";
    }
    if (cond.includes("snow") || cond.includes("flurries")) {
      return "❄️";
    }
    if (
      cond.includes("fog") ||
      cond.includes("mist") ||
      cond.includes("haze")
    ) {
      return "🌫️";
    }
    if (cond.includes("wind")) {
      return "💨";
    }

    return isDaytime ? "☀️" : "🌙";
  };

  const getWeatherIconFromCode = (code: number, isDaytime: boolean): string => {
    // WMO Weather interpretation codes
    if (code === 0) return isDaytime ? "☀️" : "🌙";
    if (code === 1 || code === 2) return isDaytime ? "🌤️" : "☁️";
    if (code === 3) return "☁️";
    if (code === 45 || code === 48) return "🌫️";
    if (code >= 51 && code <= 55) return "🌧️";
    if (code >= 56 && code <= 57) return "🌧️";
    if (code >= 61 && code <= 65) return "🌧️";
    if (code >= 66 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌧️";
    if (code >= 85 && code <= 86) return "❄️";
    if (code >= 95 && code <= 99) return "⛈️";

    return isDaytime ? "☀️" : "🌙";
  };

  const getWeatherCondition = (code: number): string => {
    const conditions: { [key: number]: string } = {
      0: "Clear",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Rime Fog",
      51: "Light Drizzle",
      53: "Moderate Drizzle",
      55: "Heavy Drizzle",
      56: "Light Freezing Drizzle",
      57: "Heavy Freezing Drizzle",
      61: "Light Rain",
      63: "Moderate Rain",
      65: "Heavy Rain",
      66: "Light Freezing Rain",
      67: "Heavy Freezing Rain",
      71: "Light Snow",
      73: "Moderate Snow",
      75: "Heavy Snow",
      77: "Snow Grains",
      80: "Light Showers",
      81: "Moderate Showers",
      82: "Heavy Showers",
      85: "Light Snow Showers",
      86: "Heavy Snow Showers",
      95: "Thunderstorm",
      96: "Thunderstorm with Hail",
      99: "Severe Thunderstorm",
    };

    return conditions[code] || "Unknown";
  };

  return (
    <div className="w-40 h-40 rounded-[2rem] bg-gradient-to-br from-blue-400/30 to-blue-600/30 backdrop-blur-xl border border-white/20 shadow-lg flex flex-col p-5 text-white relative overflow-hidden">
      <div className="text-xs font-semibold uppercase opacity-80 truncate">
        {weatherData.isLoading
          ? "Loading..."
          : weatherData.error
          ? weatherData.error
          : weatherData.location}
      </div>

      {weatherData.isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-2xl">...</div>
        </div>
      ) : weatherData.error ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-lg">⚠️</div>
          <div className="text-xs text-center mt-2">{weatherData.error}</div>
        </div>
      ) : (
        <>
          <div className="text-4xl font-light mt-1 flex items-center gap-2">
            <span>{weatherData.temperature}°C</span>
          </div>
          <div className="mt-auto flex flex-col">
            <span className="text-xs font-medium truncate">
              {weatherData.condition}
            </span>
            <span className="text-[10px] opacity-60">
              H:{weatherData.high}°C L:{weatherData.low}°C
            </span>
          </div>
        </>
      )}

      {/* Weather icon in the corner */}
      {!weatherData.isLoading && !weatherData.error && (
        <div className="absolute top-4 right-4 text-3xl">
          {weatherData.icon}
        </div>
      )}
    </div>
  );
};

const CalendarWidget = () => {
  const date = new Date();
  return (
    <div className="w-40 h-40 rounded-[2rem] bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-white/20 shadow-lg flex flex-col items-center justify-center text-black dark:text-white">
      <div className="text-sm font-semibold uppercase text-red-500">
        {date.toLocaleDateString([], { month: "short" })}
      </div>
      <div className="text-5xl font-light tracking-tighter">
        {date.getDate()}
      </div>
      <div className="text-xs opacity-60 mt-1">
        {date.toLocaleDateString([], { weekday: "long" })}
      </div>
    </div>
  );
};
