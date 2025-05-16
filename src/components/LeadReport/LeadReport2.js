import React from "react";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from "powerbi-client";
import './LeadReport.css'


export const LeadReport2=()=>{
    return(
        <div>

<div style={{textAlign:'center'}}>

<h1 > <b>  Leads Dashboard 2  </b> </h1>
</div>

<PowerBIEmbed
                      embedConfig = {{
                        type: 'dashboard',   // Supported types: report, dashboard, tile, visual and qna
                        id: '1f9d3b35-ef35-4aea-9bb7-d81eb0da9d50',
                        embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiZDdlMTFjNzgtMmE5NS00MWNjLThkNGItMDZkMDhkYmQyYjFjIiwidCI6ImY4OGQ0ZTM1LTA0ZDEtNDQ0OS1hYmNlLWQxN2YwMWJlOWNiNSJ9',
                        accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZjg4ZDRlMzUtMDRkMS00NDQ5LWFiY2UtZDE3ZjAxYmU5Y2I1LyIsImlhdCI6MTY1NTkyMTEwMiwibmJmIjoxNjU1OTIxMTAyLCJleHAiOjE2NTU5MjY3NzUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFQdElvaGJzY3dPVUczbWtUVHpldmJGS0Z3d0lyYlR3S3RhaGhjTTdUSWhmU3YwbEVRUHV5NEdiY3p3RUJMMTZRIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjIzZDhmNmJkLTFlYjAtNGNjMi1hMDhjLTdiZjUyNWM2N2JjZCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiQmFuZ2VyYSIsImdpdmVuX25hbWUiOiJWaWR5YSIsImlwYWRkciI6IjEyMi4xNjkuMTE3LjE5MiIsIm5hbWUiOiJWaWR5YSBCYW5nZXJhIiwib2lkIjoiYjdkYjE4NTAtZDI3MC00MmQ5LTgyZjgtNTNjNjE3OGM3ZWZiIiwicHVpZCI6IjEwMDMyMDAyMDYyRkRCM0QiLCJyaCI6IjAuQVhFQU5VNk4tTkVFU1VTcnp0Rl9BYjZjdFFrQUFBQUFBQUFBd0FBQUFBQUFBQUNIQUNzLiIsInNjcCI6IkFwcC5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkV3JpdGUuQWxsIENvbnRlbnQuQ3JlYXRlIERhc2hib2FyZC5SZWFkLkFsbCBEYXNoYm9hcmQuUmVhZFdyaXRlLkFsbCBEYXRhZmxvdy5SZWFkLkFsbCBEYXRhZmxvdy5SZWFkV3JpdGUuQWxsIERhdGFzZXQuUmVhZC5BbGwgRGF0YXNldC5SZWFkV3JpdGUuQWxsIEdhdGV3YXkuUmVhZC5BbGwgR2F0ZXdheS5SZWFkV3JpdGUuQWxsIFBpcGVsaW5lLkRlcGxveSBQaXBlbGluZS5SZWFkLkFsbCBQaXBlbGluZS5SZWFkV3JpdGUuQWxsIFJlcG9ydC5SZWFkLkFsbCBSZXBvcnQuUmVhZFdyaXRlLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkV3JpdGUuQWxsIFRlbmFudC5SZWFkLkFsbCBUZW5hbnQuUmVhZFdyaXRlLkFsbCBVc2VyU3RhdGUuUmVhZFdyaXRlLkFsbCBXb3Jrc3BhY2UuUmVhZC5BbGwgV29ya3NwYWNlLlJlYWRXcml0ZS5BbGwiLCJzdWIiOiJSZXYtRHJUOHF4cjlCdTktLVJvY1hKbjB0UlBxcV9nQ3M4clJ1TFFjYjZFIiwidGlkIjoiZjg4ZDRlMzUtMDRkMS00NDQ5LWFiY2UtZDE3ZjAxYmU5Y2I1IiwidW5pcXVlX25hbWUiOiJWaWR5YUBpb3J0YXRlY2gub25taWNyb3NvZnQuY29tIiwidXBuIjoiVmlkeWFAaW9ydGF0ZWNoLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6IjlPUklNZ19FZTBHSUd6X2U5MElzQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjY5MDkxMjQ2LTIwZTgtNGE1Ni1hYTRkLTA2NjA3NWIyYTdhOCIsImZlOTMwYmU3LTVlNjItNDdkYi05MWFmLTk4YzNhNDlhMzhiMSIsIjYyZTkwMzk0LTY5ZjUtNDIzNy05MTkwLTAxMjE3NzE0NWUxMCIsImYyOGExZjUwLWY2ZTctNDU3MS04MThiLTZhMTJmMmFmNmI2YyIsIjI5MjMyY2RmLTkzMjMtNDJmZC1hZGUyLTFkMDk3YWYzZTRkZSIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.V5yp124pCs-cS72eiF5mQcNEV6BX8HpU0thwuh94dbWrRvlWrGPtNuGw44MpjwhWbzXVa8XmwVfejYc6hTMr3mTxCE5MTmKmggy0VyidE7d0VFxujA2jTujNzv8Px8oOOd903cRbAo5JdRZBTv0862zvPROXCoMzb1CWLalk1lc0hRgjBn5fLM45NEMCtifq-E2wu2dIkAj5gD53yyL6sreChlFbyICf6mhcFtz2KwGkEa-umuEE6qsQl1QGR7JCsuHuWmcGxD_AwvKldKaNYCuqedgYzL7pdjCPUl3-K8hTctxjnobcmebk9VfSaRh7Ibvbsc3r6hEGZ2EUHrM_gg',
                        tokenType: models.TokenType.Aad,
                        settings: {
                          panes: {
                            filters: {
                              expanded: false,
                              visible: false
                            }
                          },
                        }
                      }}

                      eventHandlers = { 
                        new Map([
                          ['loaded', function () {}],
                          ['rendered', function () {}],
                          ['error', function (event) {}]
                        ])
                      }
                        
                      cssClassName = { "Embed-container" }

                      getEmbeddedComponent = { (embeddedReport) => {
                        window.report = embeddedReport ;
                      }}
                    />
        </div>
    )
}

