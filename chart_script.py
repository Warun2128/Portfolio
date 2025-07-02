import plotly.graph_objects as go
import json

# Data for domain expertise
data = {
  "domain_expertise": [
    {"skill": "Healthcare Analytics", "proficiency": 95},
    {"skill": "Financial Analysis", "proficiency": 90},
    {"skill": "Sales Analytics", "proficiency": 85},
    {"skill": "Customer Segmentation", "proficiency": 90},
    {"skill": "Business Intelligence", "proficiency": 90},
    {"skill": "Data Visualization", "proficiency": 95}
  ]
}

# Extract skills and proficiencies
skills = [item["skill"] for item in data["domain_expertise"]]
proficiencies = [item["proficiency"] for item in data["domain_expertise"]]

# Abbreviate skill names to fit 15 character limit
abbreviated_skills = []
for skill in skills:
    if len(skill) <= 15:
        abbreviated_skills.append(skill)
    else:
        # Abbreviate longer skill names
        if skill == "Healthcare Analytics":
            abbreviated_skills.append("Healthcare Ana")
        elif skill == "Financial Analysis":
            abbreviated_skills.append("Financial Ana")
        elif skill == "Sales Analytics":
            abbreviated_skills.append("Sales Analytics")
        elif skill == "Customer Segmentation":
            abbreviated_skills.append("Customer Seg")
        elif skill == "Business Intelligence":
            abbreviated_skills.append("Business Intel")
        elif skill == "Data Visualization":
            abbreviated_skills.append("Data Visual")
        else:
            abbreviated_skills.append(skill[:15])

# Create radar chart
fig = go.Figure()

fig.add_trace(go.Scatterpolar(
    r=proficiencies,
    theta=abbreviated_skills,
    fill='toself',
    fillcolor='rgba(0, 123, 255, 0.3)',  # Primary blue (#007bff) with transparency
    line=dict(color='rgba(0, 61, 128, 1)', width=3),  # Darker blue border
    marker=dict(color='rgba(0, 61, 128, 1)', size=8),
    name='Proficiency',
    hovertemplate='%{theta}: %{r}%<extra></extra>',
    cliponaxis=False
))

# Update layout for professional appearance
fig.update_layout(
    polar=dict(
        radialaxis=dict(
            visible=True,
            range=[0, 100],
            tickvals=[20, 40, 60, 80, 100],
            ticktext=['20', '40', '60', '80', '100'],
            gridcolor='rgba(128, 128, 128, 0.3)',
            linecolor='rgba(128, 128, 128, 0.5)',
            tickfont=dict(size=12)
        ),
        angularaxis=dict(
            gridcolor='rgba(128, 128, 128, 0.3)',
            linecolor='rgba(128, 128, 128, 0.5)',
            tickfont=dict(size=14)
        )
    ),
    title=dict(
        text="Domain Expertise",
        font=dict(size=18)
    ),
    showlegend=False,
    font=dict(family="Arial, sans-serif")
)

# Save the chart
fig.write_image("domain_expertise_radar.png")