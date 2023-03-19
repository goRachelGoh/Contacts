# Set the base image as the .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Set the working directory
WORKDIR /src

# Copy source and restore dependencies
COPY . .
RUN dotnet restore "Contacts.csproj"

# Build the application in release mode
RUN dotnet build "Contacts.csproj" -c Release -o /build

# Publish the application
FROM build AS publish
RUN dotnet publish "Contacts.csproj" -c Release -o /publish

# Use the .NET runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime

# Set the working directory
WORKDIR /app

# Copy the published files from the 'publish' stage
COPY --from=publish /src .

# Build frontend
FROM node:lts-alpine3.17 as node
WORKDIR .

# Copy files to desktop dir
RUN mkdir desktop
COPY ./ClientApp ./desktop
WORKDIR desktop

# Install dependencies
RUN npm i -g @angular/cli@13.3.5
RUN npm i

# Build
RUN ng build

# Deploy via nginx
FROM nginx:alpine
COPY --from=node /desktop/dist /usr/share/nginx/html
COPY --from=node /desktop/docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port the app will run on
EXPOSE 81

# Set the entry point for the application
ENTRYPOINT ["dotnet", "bin/Release/net6.0/Contacts.dll"]
