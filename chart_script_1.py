import plotly.graph_objects as go
import plotly.io as pio

# Data for the chart
projects = [
    "Patient Readm",
    "COVID Impact", 
    "Investment Opt",
    "E-commerce Opt"
]

values = [2.3, 0.675, 0.345, 0.420]

# Create horizontal bar chart
fig = go.Figure()

fig.add_trace(go.Bar(
    y=projects,
    x=values,
    orientation='h',
    marker_color='#007bff',
    text=[f'${v}M' for v in values],
    textposition='outside',
    cliponaxis=False
))

# Update layout
fig.update_layout(
    title="Portfolio Impact - Total: $2.8M+",
    xaxis_title="Business Val ($M)",
    yaxis_title="Projects"
)

# Update axes
fig.update_xaxes(tickformat='.1f', ticksuffix='M', tickprefix='$')
fig.update_yaxes(categoryorder='total ascending')

# Save the chart
fig.write_image("business_impact_chart.png")