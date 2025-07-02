import plotly.graph_objects as go
import pandas as pd
import numpy as np

# Create the data from the provided JSON
data = [
    {"domain": "Healthcare Analytics", "technique": "Time Series Analysis", "level": "Expert", "value": 3},
    {"domain": "Healthcare Analytics", "technique": "Geographic Mapping", "level": "Expert", "value": 3},
    {"domain": "Healthcare Analytics", "technique": "Risk Assessment", "level": "Expert", "value": 3},
    {"domain": "Healthcare Analytics", "technique": "Customer Segmentation", "level": "Basic", "value": 1},
    {"domain": "Healthcare Analytics", "technique": "Predictive Modeling", "level": "Advanced", "value": 2},
    {"domain": "Healthcare Analytics", "technique": "Correlation Analysis", "level": "Expert", "value": 3},
    {"domain": "Healthcare Analytics", "technique": "Performance Dashboards", "level": "Expert", "value": 3},
    
    {"domain": "Financial Analytics", "technique": "Time Series Analysis", "level": "Expert", "value": 3},
    {"domain": "Financial Analytics", "technique": "Geographic Mapping", "level": "Basic", "value": 1},
    {"domain": "Financial Analytics", "technique": "Risk Assessment", "level": "Expert", "value": 3},
    {"domain": "Financial Analytics", "technique": "Customer Segmentation", "level": "Advanced", "value": 2},
    {"domain": "Financial Analytics", "technique": "Predictive Modeling", "level": "Expert", "value": 3},
    {"domain": "Financial Analytics", "technique": "Correlation Analysis", "level": "Expert", "value": 3},
    {"domain": "Financial Analytics", "technique": "Performance Dashboards", "level": "Advanced", "value": 2},
    
    {"domain": "Sales Analytics", "technique": "Time Series Analysis", "level": "Advanced", "value": 2},
    {"domain": "Sales Analytics", "technique": "Geographic Mapping", "level": "Advanced", "value": 2},
    {"domain": "Sales Analytics", "technique": "Risk Assessment", "level": "Basic", "value": 1},
    {"domain": "Sales Analytics", "technique": "Customer Segmentation", "level": "Expert", "value": 3},
    {"domain": "Sales Analytics", "technique": "Predictive Modeling", "level": "Advanced", "value": 2},
    {"domain": "Sales Analytics", "technique": "Correlation Analysis", "level": "Advanced", "value": 2},
    {"domain": "Sales Analytics", "technique": "Performance Dashboards", "level": "Expert", "value": 3}
]

# Convert to DataFrame
df = pd.DataFrame(data)

# Create abbreviated labels (15 char limit)
domain_map = {
    "Healthcare Analytics": "Healthcare",
    "Financial Analytics": "Financial", 
    "Sales Analytics": "Sales"
}

technique_map = {
    "Time Series Analysis": "Time Series",
    "Geographic Mapping": "Geographic",
    "Risk Assessment": "Risk Assess",
    "Customer Segmentation": "Customer Seg",
    "Predictive Modeling": "Predictive",
    "Correlation Analysis": "Correlation",
    "Performance Dashboards": "Performance"
}

# Apply abbreviations
df['domain_abbrev'] = df['domain'].map(domain_map)
df['technique_abbrev'] = df['technique'].map(technique_map)

# Create pivot table for heatmap
matrix = df.pivot(index='domain_abbrev', columns='technique_abbrev', values='value')

# Define the order of domains and techniques
domains = ["Healthcare", "Financial", "Sales"]
techniques = ["Time Series", "Geographic", "Risk Assess", "Customer Seg", "Predictive", "Correlation", "Performance"]

# Reorder the matrix
matrix = matrix.reindex(index=domains, columns=techniques)

# Create custom hover text with full names and levels
hover_text = []
for i, domain in enumerate(domains):
    row = []
    for j, technique in enumerate(techniques):
        value = matrix.iloc[i, j]
        level = "Basic" if value == 1 else "Advanced" if value == 2 else "Expert"
        row.append(f"{domain}<br>{technique}<br>{level}")
    hover_text.append(row)

# Create heatmap with blue color scale (light to dark blue)
fig = go.Figure(data=go.Heatmap(
    z=matrix.values,
    x=techniques,
    y=domains,
    colorscale=[[0, '#E3F2FD'], [0.5, '#64B5F6'], [1, '#1565C0']],  # Light to dark blue
    colorbar=dict(
        title="Level",
        tickvals=[1, 2, 3],
        ticktext=["Basic", "Advanced", "Expert"]
    ),
    hovertemplate='%{customdata}<extra></extra>',
    customdata=hover_text,
    showscale=True
))

# Update layout
fig.update_layout(
    title="Analytical Methods Across Domains",
    xaxis_title="Techniques",
    yaxis_title="Domains"
)

# Update axes
fig.update_xaxes(side="bottom")
fig.update_yaxes(autorange="reversed")

# Save the chart
fig.write_image("analytics_methodologies_heatmap.png")