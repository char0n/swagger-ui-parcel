import React from 'react';
import { createRoot } from 'react-dom/client';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const container = document.getElementById('swagger-ui');
const root = createRoot(container);

root.render(<SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" />);
