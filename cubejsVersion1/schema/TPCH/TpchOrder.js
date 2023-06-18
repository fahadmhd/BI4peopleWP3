cube(`TpchOrder`, {
  sql: ` Select * from Orders
  order by O_TOTALPRICE desc

  `,

  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },

  measures: {
  count: {
      type: `count`,
      drillMembers: [oOrderdate,  oComment]
    },

    oTotalprice: {
      sql: `${CUBE}.\`O_TOTALPRICE\``,
      type: `sum`,
      drillMembers: [oOrderdate,  oComment]
    }


  },

    dimensions: {
      oOrderstatus: {
        sql: `${CUBE}.\`O_ORDERSTATUS\``,
        type: `string`
      },

      oOrderpriority: {
        sql: `${CUBE}.\`O_ORDERPRIORITY\``,
        type: `string`
      },

      oClerk: {
        sql: `${CUBE}.\`O_CLERK\``,
        type: `string`
      },

      oComment: {
        sql: `${CUBE}.\`O_COMMENT\``,
        type: `string`
      },

      oOrderdate: {
        sql: `${CUBE}.\`O_ORDERDATE\``,
        type: `time`
      },

      oOrderkey: {
        sql: `${CUBE}.\`O_ORDERKEY\``,
        type: `number`
      },

      oCustkey: {
        sql: `${CUBE}.\`O_CUSTKEY\``,
        type: `number`
      }
  }

});
