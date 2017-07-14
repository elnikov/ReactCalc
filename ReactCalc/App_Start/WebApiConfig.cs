using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;

namespace ReactCalc
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();


            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                 name: "Substract",
                 routeTemplate: "api/operation/subtract/{num1}/{num2}",
                 defaults: new { controller = "Operation", action = "Subtract", num1 = "", num2 = RouteParameter.Optional }
             );

            config.Routes.MapHttpRoute(
                    name: "Addition",
                    routeTemplate: "api/operation/addition/{num1}/{num2}",
                    defaults: new { controller = "Operation", action = "Addition", num1 = "", num2 = RouteParameter.Optional }
                );

            config.Routes.MapHttpRoute(
                    name: "Multiplication",
                    routeTemplate: "api/operation/multiplicate/{num1}/{num2}",
                    defaults: new { controller = "Operation", action = "Multiplicate", num1 = "", num2 = RouteParameter.Optional }
                );

            config.Routes.MapHttpRoute(
                    name: "Division",
                    routeTemplate: "api/operation/division/{num1}/{num2}",
                    defaults: new { controller = "Operation", action = "Division", num1 = "", num2 = RouteParameter.Optional }
                );

            config.Routes.MapHttpRoute(
                    name: "Square",
                    routeTemplate: "api/operation/square/{num1}",
                    defaults: new { controller = "Operation", action = "Square", num1 = RouteParameter.Optional }
                );

            config.Routes.MapHttpRoute(
                    name: "Sqrt",
                    routeTemplate: "api/operation/sqrt/{num1}",
                    defaults: new { controller = "Operation", action = "Sqrt", num1 = RouteParameter.Optional }
                );

        }
    }
}
